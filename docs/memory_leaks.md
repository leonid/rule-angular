How to create giant memory leaks in AngularJS

This guide shows how to create an AngularJS application that consumes more and more memory until, eventually, the browser process crashes on your users.

How to observe memory consumption

To inspect the amount of memory consumed by your Javascripts in Chrome:

Open an incognito window
Open the page you want to inspect
Press Shift + ESC to see a list of Chrome processes
Find the process for the incognito window
Right-click on the list and check Javascript memory
Observe the Javascript memory column as it grows and grows while using your app
Note that you can manually run the Javascript garbage collector:

Open the Developer Tools (Ctrl+Shift+J)
Open the Timeline tab
Click on the garbage can icon
Note that if you created a proper memory leak, the garbage collector won't be able to reclaim much memory. That's why it's a leak.

You can also take a look at the contents of your memory:

Run the garbage collector as described above
Open the Developer Tools (Ctrl+Shift+J)
Open the Profiles tab
Select Take Heap Snapshot
Press Take Snapshot
See a list of millions of uncollectable objects
How to leak

Register events on window, document or body

If your directives register event listeners to global elements like window, document or <body>, these listeners continue to exist after your directive element is destroyed. This also prevents referencing closures, scopes, etc. from being garbage-collected.

This code leaks memory:

@app.directive 'foo', ->
  link: (scope, element, attributes) ->
    $(document).on 'click', ->
      # code here
To prevent leaks you must manually unregister listeners from all elements that are not your own descendants.
This code does not leak memory:

@app.directive 'foo', ->
  link: (scope, element, attributes) ->
    listener = ->
      # code here
    $(document).on 'click', listener
    scope.$on '$destroy', ->
      $(document).off 'click', listener
Fail to clean up plugins

You probably have some directives to integrate classic jQuery plugins that are not AngularJS-aware: Modal dialogs, tooltips, maps, lightboxes, etc. If you fail to clean up those plugins after the directive's element is destroyed, you have no guarantee that it releases all of its resources.

The following code might leak memory:

@app.directive 'awesomeMap', ->
  link: (scope, element, attributes) ->
    AwesomeMap.init(element)
To prevent leaks, read the plugin's documentation for a way to destroy the plugin instance when you're done:

@app.directive 'awesomeMap', ->
  link: (scope, element, attributes) ->
    map = AwesomeMap.init(element)
    scope.$on '$destroy', ->
      map.nuke()
Note that the nuke() method is just an example. Every plugin has its own way of disposing it, so check out the respective documentation.

If the plugin you're using doesn't have a way to dispose it's instances, it is probably not suited for a persistent Javascript environment and you should pick a plugin that is.

Fail to unsubscribe $rootScope listeners

If you're using $rootScope as a global event bus, listeners continue to exist after your directive element is destroyed. This also prevents referencing closures, scopes, etc. from being garbage-collected.

This code leaks memory:

@app.directive 'foo', ($rootScope) ->
  link: (scope, element, attributes) ->
    $rootScope.$on 'event', ->
      scope.attribute = value
To allow the scope to be garbage collection, remove yourself as a $rootScope listener when your scope gets destroyed:

@app.directive 'foo', ($rootScope) ->
  link: (scope, element, attributes) ->
    unsubscribe = $rootScope.$on 'event', ->
      scope.key = value
    scope.$on '$destroy', unsubscribe
Fail to clear intervals and timeouts

When your directive register timers using setTimeout, setInterval or $timeout, they will not be cleaned up when the element is destroyed.

E. g. this <clock> directive leaks memory every time it is destroyed and re-created:

@app.directive 'clock', ->
  link: (scope, element, attributes) ->
    updateTime = ->
      var now = new Date();
      element.text(now.toString())
    setInterval updateTime, 1000
The version below clears the interval and doesn't leak memory:

@app.directive 'clock', ->
  link: (scope, element, attributes) ->
    updateTime = ->
      var now = new Date();
      element.text(now.toString())
    interval = setInterval(updateTime, 1000)
    scope.$on '$destroy', ->
      clearInterval(interval)
Create re-arming timers (Coffeescript)

A re-arming timer is a timeout that, when triggered, schedules itself again and again.

Because $timeout returns a promise for the timer's execution, and because Coffeescript uses the last expression in a block as implicit return value, this pattern is a great way to create an infinitely growing object graph. More details here.

This code leaks more and more memory over time:

@app.directive 'foo', ($timeout) ->
  link: (scope, element, attributes) ->
    tick = ->
      # some code here
      $timeout tick, 1000
    tick()
To prevent the leak, explicitly return undefined at the end of tick():

@app.directive 'foo', ($timeout) ->
  link: (scope, element, attributes) ->
    tick = ->
      # some code here
      $timeout tick, 1000
      return
    tick()
Note that the "good" example above is still leaking memory since it doesn't stop the re-arming timer when scope is destroyed.
See above.

Output structured objects with console.log

A great way to create memory leaks is to output a structured objects (e. g. an Angular scope) to your browser console:

console.log(scope)
Since the browser console allows you to dive into scope and traverse its object graph, scope can now no longer be garbage collected. So in trying to debug a memory leak using console.log you're making everything worse.

Fail to clean up scopes you created yourself

You can use $new create new scopes from an existing scopes:

myScope = scope.$new()
You are now responsible for cleaning up myScope when you're done with it, by calling myScope.$destroy(). Javascript's garbage collection will not do this for you.

If you fail to clean up myScope it will forever be linked to scope and continue to participate in model change detection and listener notification.

Fail to clean up watches on $rootScope

Are you abusing $rootScope to watch arbitrary code expressions outside of AngularJS components? Like this:

observer = ->
  # observe expression

$rootScope.$watch observer, (new, old) ->
  # code to run if the expression changes
This watcher will continue to be called indefinitely unless you clean up after yourself:

observer = ->
  # observe expression

unsubscribe = $rootScope.$watch observer, (new, old) ->
  # code to run if the expression changes
  
# later, when you no longer need the watch
unsubscribe()
Build your own, infinitely growing cache

This is more about programming 101 but AngularJS but nonetheless:

If you create a caching mechanism for performance, but fail to contain the cache size, it will consume more and more memory and prevent the garbage collector from reclaiming memory.

This userRepository service caches users once they were loaded from a remote server and, hence, leaks memory:

app.factory 'userRepository', ($q) ->

  userCache = {}

  findUser: (email) ->

    if cachedUser = userCache[email]
      $q.when(cachedUser)
    else
      loadUserFromServer(email).then (user) ->
        userCache[email] = user
You can score extra leakage for caching DOM nodes or AngularJS scopes in this fashion.

To prevent leaks, make sure the cache has a limited size, and automatically prunes itself when new entries are inserted (FIFO or least-recently-used).

Avoid caching highly linked objects like DOM nodes, AngularJS scopes or domain models that hold a lot of references to other models.

Blow up the jQuery cache

This really affects all jQuery 1.x code: jQuery doesn't store information about event listeners and data values with the element itself. This information is instead stored in the global $.cache object. Every time you add an event listener or data value to a jQuery object, $.cache gains another entry.

The only way that a $.cache entry gets deleted is when you call remove() on the element that put it there!

We have our own card about this issue: How to create memory leaks with jQuery 1.x.

Note that Angular (sometimes?) adds an element's associated scope as data('$scope'). This means that not only can't the element be garbage-collected, its scope (and parent scopes and child scopes) can't be collected either.

Use an old (or new) version of AngularJS

The AngularJS team is diligently fixing memory leaks, unfortunately these issues are very hard to reproduce and debug.
Every AngularJS version has its own list of leak-releated issues:

Open issues tagged as memory leaks
All issues tagged as memory leaks
In general, more recent versions appear to have more safeguards in place.

Use the AngularJS Batarang Chrome extension (or any other extension)

The Batarang Chrome extension has its own memory leaks.
Also, since it displays contents of scopes and such, it might prevent these scopes from being garbage collected.

The same might be true for any other browser extension or plugin.

When hunting for memory leaks, use an icognito window or disable all extensions.

Use ng-animate

Some people are seeing leaks when using ng-animate.

Use the ui-router

Some users of the angular-ui router are getting leaks on every state change.

Use ng-repeat to iterate over custom objects

Iterating over non-primitives using ng-repeat seems to create objects that cannot be garbage-collected.

A fix for this might be part of the 1.3.15 release of AngularJS.