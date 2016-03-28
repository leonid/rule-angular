Принципы REST API

API представляет собой способ взаимодействия между вами и пользователями данных. Документация позволяет упорядочить эти связи разработчика и данных.

Определения и термины

Resource: A single instance of an object. For example, an animal.
Collection: A collection of homogeneous objects. For example, animals.
HTTP: A protocol for communicating over a network.
Consumer: A client computer application capable of making HTTP requests.
Third Party Developer: A developer not a part of your project but who wishes to consume your data.
Server: An HTTP server/application accessible from a Consumer over a network.
Endpoint: An API URL on a Server which represents either a Resource or an entire Collection.
Idempotent: Side-effect free, can happen multiple times without penalty.
URL Segment: A slash-separated piece of information in the URL.
Data Design and Abstraction

Planning how your API will look begins earlier than you’d think; first you need to decide how your data will be designed and how your core service / application will work. If you’re doing API First Development this should be easy. If you’re attaching an API to an existing project, you may need to provide more abstraction.

Occasionally, a Collection can represent a database table, and a Resource can represent a row within that table. However, this is not the usual case. In fact, your API should abstract away as much of your data and business logic as possible. It is very important that you don’t overwhelm Third-Party Developers with any complex application data, if you do they won’t want to use your API.

There are also many parts of your service which you SHOULD NOT expose via API at all. A common example is that many APIs will not allow third parties to create users.

Глаголы

Наиболее известными и часто используемыми являются GET и POST запросы.

There are four and a half very important HTTP verbs that you need to know about. I say “and a half”, because the PATCH verb is very similar to the PUT verb, and two two are often combined by many an API developer. Here are the verbs, and next to them are their associated database call (I’m assuming most people reading this know more about writing to a database than designing an API).

GET (SELECT): Retrieve a specific Resource from the Server, or a listing of Resources.
POST (CREATE): Create a new Resource on the Server.
PUT (UPDATE): Update a Resource on the Server, providing the entire Resource.
PATCH (UPDATE): Update a Resource on the Server, providing only changed attributes.
DELETE (DELETE): Remove a Resource from the Server.
Here are two lesser known HTTP verbs:

HEAD – Retrieve meta data about a Resource, such as a hash of the data or when it was last updated.
OPTIONS – Retrieve information about what the Consumer is allowed to do with the Resource.
A good RESTful API will make use of the four and a half HTTP verbs for allowing third parties to interact with its data, and will never include actions / verbs as URL segments.

Typically, GET requests can be cached (and often are!) Browsers, for example, will cache GET requests (depending on cache headers), and will go as far as prompt the user if they attempt to POST for a second time. A HEAD request is basically a GET without the response body, and can be cached as well.

Versioning

No matter what you are building, no matter how much planning you do beforehand, your core application is going to change, your data relationships will change, attributes will invariably be added and removed from your Resources. This is just how software development works, and is especially true if your project is alive and used by many people (which is likely the case if you’re building an API).

Remember than an API is a published contract between a Server and a Consumer. If you make changes to the Servers API and these changes break backwards compatibility, you will break things for your Consumer and they will resent you for it. Do it enough, and they will leave. To ensure your application evolves AND you keep your Consumers happy, you need to occasionally introduce new versions of the API while still allowing old versions to be accessible.

As a side note, if you are simply ADDING new features to your API, such as new attributes on a Resource (which are not required and the Resource will function without), or if you are ADDING new Endpoints, you do not need to increment your API version number since these changes do not break backwards compatibility. You will want to update your API Documentation (your Contract), of course.

Over time you can deprecate old versions of the API. To deprecate a feature doesn’t mean to shut if off or diminish the quality of it, but to tell Consumers of your API that the older version will be removed on a specific date and that they should upgrade to a newer version.

A good RESTful API will keep track of the version in the URL. The other most common solution is to put a version number in a request header, but after working with many different Third Party Developers, I can tell you that adding headers is no where near as easy as adding a URL Segment.

Analytics

Keep track of the version/endpoints of your API being used by Consumers. This can be as simple as incrementing an integer in a database each time a request is made. There are many reasons that keeping track of API Analytics is a good idea, for example, the most commonly used API calls should be made efficient.

For the purposes of building an API which Third Party Developers will love, the most important thing is that when you do deprecate a version of your API, you can actually contact developers using deprecated API features. This is the perfect way to remind them to upgrade before you kill the old API version.

The process of Third Party Developer notification can be automated, e.g. mail the developer every time 10,000 requests to a deprecated feature are made.

API Root URL

The root location of your API is important, believe it or not. When a developer (read as code archaeologist) inherits an old project using your API and needs to build new features, they may not know about your service at all. Perhaps all they know is a list of URLs which the Consumer calls out to. It’s important that the root entry point into your API is as simple as possible, as a long complex URL will appear daunting and can turn developers away.

Here are two common URL Roots:

https://example.org/api/v1/*
https://api.example.com/v1/*
If your application is huge, or you anticipate it becoming huge, putting the API on its own subdomain (e.g. api.) is a good choice. This can allow for some more flexible scalability down the road.

If you anticipate your API will never grow to be that large, or you want a much simpler application setup (e.g. you want to host the website AND API from the same framework), placing your API beneath a URL segment at the root of the domain (e.g. /api/) works as well.

It’s a good idea to have content at the root of your API. Hitting the root of GitHub’s API returns a listing of endpoints, for example. Personally, I’m a fan of having the root URL give information which a lost developer would find useful, e.g., how to get to the developer documentation for the API.

Also, notice the HTTPS prefix. As a good RESTful API, you must host your API behind HTTPS.

Endpoints

An Endpoint is a URL within your API which points to a specific Resource or a Collection of Resources.

If you were building a fictional API to represent several different Zoo’s, each containing many Animals (with an animal belonging to exactly one Zoo), employees (who can work at multiple zoos) and keeping track of the species of each animal, you might have the following endpoints:

https://api.example.com/v1/zoos
https://api.example.com/v1/animals
https://api.example.com/v1/animal_types
https://api.example.com/v1/employees
When referring to what each endpoint can do, you’ll want to list valid HTTP Verb and Endpoint combinations. For example, here’s a semi-comprehensive list of actions one can perform with our fictional API. Notice that I’ve preceded each endpoint with the HTTP Verb, as this is the same notation used within an HTTP Request header.

GET /zoos: List all Zoos (ID and Name, not too much detail)
POST /zoos: Create a new Zoo
GET /zoos/ZID: Retrieve an entire Zoo object
PUT /zoos/ZID: Update a Zoo (entire object)
PATCH /zoos/ZID: Update a Zoo (partial object)
DELETE /zoos/ZID: Delete a Zoo
GET /zoos/ZID/animals: Retrieve a listing of Animals (ID and Name).
GET /animals: List all Animals (ID and Name).
POST /animals: Create a new Animal
GET /animals/AID: Retrieve an Animal object
PUT /animals/AID: Update an Animal (entire object)
PATCH /animals/AID: Update an Animal (partial object)
GET /animal_types: Retrieve a listing (ID and Name) of all Animal Types
GET /animal_types/ATID: Retrieve an entire Animal Type object
GET /employees: Retrieve an entire list of Employees
GET /employees/EID: Retreive a specific Employee
GET /zoos/ZID/employees: Retrieve a listing of Employees (ID and Name) who work at this Zoo
POST /employees: Create a new Employee
POST /zoos/ZID/employees: Hire an Employee at a specific Zoo
DELETE /zoos/ZID/employees/EID: Fire an Employee from a specific Zoo
In the above list, ZID means Zoo ID, AID means Animal ID, EID means Employee ID, and ATID means Animal Type ID. Having a key in your documentation for whatever convention you choose is a good idea.

I’ve left out the common API URL prefix in the above examples for brevity. While this can be fine during communications, in your actual API documentation, you should always display the full URL to each endpoint (e.g. GET http://api.example.com/v1/animal_type/ATID).

Notice how the relationships between data is displayed, specifically the many to many relationships between employees and zoos. By adding an additional URL segment, one can perform more specific interactions. Of course there is no HTTP verb for “FIRE”-ing an employee, but by performing a DELETE on an Employee located within a Zoo, we’re able to achieve the same effect.

Фильтрация

When a Consumer makes a request for a listing of objects, it is important that you give them a list of every single object matching the requested criteria. This list could be massive. But, it is important that you don’t perform any arbitrary limitations of the data. It is these arbitrary limits which make it hard for a third party developer to know what is going on. If they request a certain Collection, and iterate over the results, and they never see more than 100 items, it is now their job to figure out where this limit is coming from. Is their ORM buggy and limiting items to 100? Is the network chopping up large packets?

Minimize the arbitrary limits imposed on Third Party Developers.
It is important, however, that you do offer the ability for a Consumer to specify some sort of filtering/limitation of the results. The most important reason for this is that the network activity is minimal and the Consumer gets their results back as soon as possible. The second most important reason for this is the Consumer may be lazy, and if the Server can do filtering and pagination for them, all the better. The not-so-important reason (from the Consumers perspective), yet a great benefit for the Server, is that the request will be less resource heavy.

Filtering is mostly useful for performing GETs on Collections of resources. Since these are GET requests, filtering information should be passed via the URL. Here are some examples of the types of filtering you could conceivably add to your API:

?limit=10: Reduce the number of results returned to the Consumer (для постраничного вывода)
?offset=10: Send sets of information to the Consumer (for Pagination)
?animal_type_id=1: Filter records which match the following condition (WHERE animal_type_id = 1)
?sortby=name&order=asc: Sort the results based on the specified attribute (ORDER BY name ASC)
Some of these filterings can be redundant with endpoint URLS. For example I previously mentioned GET /zoo/ZID/animals. This would be the same thing as GET /animals?zoo_id=ZID. Dedicated endpoints being made available to the Consumer will make their lives easier, this is especially true with requests you anticipate they will make a lot. In the documentation, mention this redundancy so that Third Party Developers aren’t left wondering if differences exist.

Also, this goes without saying, but whenever you perform filtering or sorting of data, make sure you white-list the columns for which the Consumer can filter and sort by. We don’t want any database errors being sent to Consumers!

Коды http-статусов

It is very important that as a RESTful API, you make use of the proper HTTP Status Codes; they are a standard after all! Various network equipment is able to read these status codes, e.g. load balancers can be configured to avoid sending requests to a web server sending out lots of 50x errors. There are a plethora of HTTP Status Codes to choose from, however this list should be a good starting point:

200 OK – [GET]
The Consumer requested data from the Server, and the Server found it for them (Idempotent)
201 CREATED – [POST/PUT/PATCH]
The Consumer gave the Server data, and the Server created a resource
204 NO CONTENT – [DELETE]
The Consumer asked the Server to delete a Resource, and the Server deleted it
400 INVALID REQUEST – [POST/PUT/PATCH]
The Consumer gave bad data to the Server, and the Server did nothing with it (Idempotent)
404 NOT FOUND – [*]
The Consumer referenced an inexistant Resource or Collection, and the Server did nothing (Idempotent)
500 INTERNAL SERVER ERROR – [*]
The Server encountered an error, and the Consumer has no knowledge if the request was successful
Status Code Ranges

The 1xx range is reserved for low-level HTTP stuff, and you’ll very likely go your entire career without manually sending one of these status codes.

The 2xx range is reserved for successful messages where all goes as planned. Do your best to ensure your Server sends as many of these to the Consumer as possible.

The 3xx range is reserved for traffic redirection. Most APIs do not use these requests much (not nearly as often as the SEO folks use them ;), however, the newer Hypermedia style APIs will make more use of these.

The 4xx range is reserved for responding to errors made by the Consumer, e.g. they’re providing bad data or asking for things which don’t exist. These requests should be be idempotent, and not change the state of the server.

The 5xx range is reserved as a response when the Server makes a mistake. Often times, these errors are thrown by low-level functions even outside of the developers hands, to ensure a Consumer gets some sort of response. The Consumer can’t possibly know the state of the server when a 5xx response is received, and so these should be avoidable.

Expected Return Documents

When performing actions using the different HTTP verbs to Server endpoints, a Consumer needs to get some sort of information in return. This list is pretty typical of RESTful APIs:

GET /collection: Return a listing (array) of Resource objects
GET /collection/resource: Return an individual Resource object
POST /collection: Return the newly created Resource object
PUT /collection/resource: Return the complete Resource object
PATCH /collection/resource: Return the complete Resource object
DELETE /collection/resource: Return an empty document
Note that when a Consumer creates a Resource, they usually do not know the ID of the Resource being created (nor other attributes such as created and modified timestamps, if applicable). These additional attributes are returned with subsequent request, and of course as a response to the initial POST.

Аутентификация

Most of the time a Server will want to know exactly who is making which Requests. Sure, some APIs provide endpoints to be consumed by the general (anonymous) public, but most of the time work is being perform on behalf of someone.

OAuth 2.0 provides a great way of doing this. With each Request, you can be sure you know which Consumer is making requests, which User they are making requests on behalf of, and provides a (mostly) standardized way of expiring access or allowing Users to revoke access from a Consumer, all without the need for a third-party consumer to know the Users login credentials.

There are also OAuth 1.0 and xAuth, which fill the same space. Whichever method you choose, make sure it is something common and well documented with many different libraries written for the languages/platforms which your Consumers will likely be using.

I can honestly tell you that OAuth 1.0a, while it is the most secure of the options, is a huge pain in the ass to implement. I was surprised by the number of Third Party Developers who had to implement their own library since one didn’t exist for their language already. I’ve spent enough hours debugging cryptic “invalid signature” errors to recommend you choose an alternative.

Тип контента

Currently, the most “exciting” of APIs provide JSON data from RESTful interfaces. This includes Facebook, Twitter, GitHub, you name it. XML appears to have lost the war a while ago (except in large corporate environments). SOAP, thankfully, is all but dead, and we really don’t see much APIs providing HTML to be consumed (unless, that is, you’re building a scraper!)

Developers using popular languages and frameworks can very likely parse any valid data format you return to them. You can even provide data in any of the aforementioned data formats (not including SOAP) quite easily, if you’re building a common response object and using a different serializer. What does matter though, is that you make use of the Accept header when responding with data.

Some API creators recommend adding a .json, .xml, or .html file extension to the URL (after the endpoint) for specifying the content type to be returned, although I’m personally not a fan of this. I really like the Accept header (which is built into the HTTP spec) and feel that is the appropriate thing to use.

Hypermedia APIs

Hypermedia APIs are very likely the future of RESTful API design. They’re actually a pretty amazing concept, going “back to the roots” of how HTTP and HTML was intended to work.

When working with non-Hypermedia RESTful APIs, the URL Endpoints are part of the contract between the Server and the Consumer. These Endpoints MUST be known by the Consumer ahead of time, and changing them means the Consumer is no longer able to communicate with the Server as intended. This, as you can assume, is quite a limitation.

Now, API Consumers are of course not the only user agent making HTTP requests on the Internet. Far from it. Humans, with their web browsers, are the most common user agent making HTTP requests. Humans, however, are NOT locked into this predefined Endpoint URL contract that RESTful APIs are. What makes humans so special? Well, they’re able to read content, click links for headings which look interesting, and in general explore a website and interpret content to get to where they want to go. If a URL changes, a human is not affected (unless, that is, they bookmarked a page, in which case they go to the homepage and find a new route to their beloved data).

The Hypermedia API concept works the same way a human would. Requesting the Root of the API returns a listing of URLs which point perhaps to each collection of information, and describing each collection in a way which the Consumer can understand. Providing IDs for each resource isn’t important (or necessarily required), as long as a URL is provided.

With the Consumer of a Hypermedia API crawling links and gathering information, URLs are always up-to-date within responses, and do not need to be known beforehand as part of a contract. If a URL is ever cached, and a subsequent request returns a 404, the Consumer can simply go back to the root and discover the content again.

When retrieving a list of Resources within a Collection, an attribute containing a complete URL for the individual Resources are returned. When performing a POST/PATCH/PUT, the response can be a 3xx redirect to the complete Resource.

JSON doesn’t quite give us the semantics we need for specifying which attributes are URLs, nor how URLs relate to the current document. HTML, as you can probably guess, does provide this information. We may very well see our APIs coming full circle and returning back to consuming HTML. Considering how far we’ve come with CSS, one day we may even see  it be common practice for APIs and Websites to use the exact same URLs and content.

Документация

Honestly, if you don’t conform 100% to the criteria in this guide, your API will not necessarily be horrible. However, if you don’t properly document your API, nobody is going to know how to use it, and it WILL be a horrible API.

Make your Documentation available to unauthenticated developers.

Do not use automatic documentation generators, or if you do, at least make sure you’re doctoring it up and making it presentable.

Do not truncate example request and response bodies; show the whole thing. Use a syntax highlighter in your documentation.

Document expected response codes and possible error messages for each endpoint, and what could have gone wrong to cause those error messages.

If you’ve got the spare time, build a developer API console so that developers can immediately experiment with your API. It’s not as hard as you might think and developers (both internal and third party) will love you for it!

Make sure your documentation can be printed; CSS is a powerful thing; don’t be afraid to hide that sidebar when the docs are printed. Even if nobody ever prints a physical copy, you’d be surprised at how many developers like to print to PDF for offline reading.

Errata: Raw HTTP Packet

Since everything we do is over HTTP, I’m going to show you a dissection of an HTTP packet. I’m often surprised at how many people don’t know what these things look like! When the Consumer sends a Request to the Server, they provide a set of Key/Value pairs, called a Header, along with two newline characters, and finally the request body. This is all sent in the same packet.

The server then responds in the say Key/Value pair format, with two newlines and then the response body. HTTP is very much a request/response protocol; there is no “Push” support (the Server sending data to the Consumer unprovoked), unless you use a different protocol such as Websockets.

When designing your API, you should be able to work with tools which allow you to look at raw HTTP packets. Consider using Wireshark, for example. Also, make sure you are using a framework / web server which allows you to read and change as many of these fields as possible.

Пример HTTP запроса


POST /v1/animal HTTP/1.1
Host: api.example.org
Accept: application/json
Content-Type: application/json
Content-Length: 24

{
  "name": "Gir",
  "animal_type": 12
}

POST /v1/animal HTTP/1.1
Host: api.example.org
Accept: application/json
Content-Type: application/json
Content-Length: 24
 
{
  "name": "Gir",
  "animal_type": 12
}

Пример HTTP ответа


HTTP/1.1 200 OK
Date: Wed, 18 Dec 2013 06:08:22 GMT
Content-Type: application/json
Access-Control-Max-Age: 1728000
Cache-Control: no-cache

{
  "id": 12,
  "created": 1386363036,
  "modified": 1386363036,
  "name": "Gir",
  "animal_type": 12
}

HTTP/1.1 200 OK
Date: Wed, 18 Dec 2013 06:08:22 GMT
Content-Type: application/json
Access-Control-Max-Age: 1728000
Cache-Control: no-cache
 
{
  "id": 12,
  "created": 1386363036,
  "modified": 1386363036,
  "name": "Gir",
  "animal_type": 12
}


Some of these rules include:

Stateless design: Data will never be stored in a session (each request includes all information needed by the server and client).
Self-descriptive messages: Ideally you should be able to understand requests and responses after spending minimal time reading the documentation.
Semantics, semantics, semantics: The API should use existing features of the HTTP protocol to improve the semanticness of input and output (e.g. HTTP Verbs, HTTP Status Codes and HTTP Authentication)
One of the most difficult decisions to make when designing a RESTful API is to find the fine line between making your API simple enough that it can be tested directly in the browser for most use cases yet still adhere to the design guidelines as closely as possible.

Now that we have laid the ground rules, let’s dive right into some examples of how to implement these rules.

Output formats

First, let’s talk about output formats. The most important thing to look at when determining what format your API should output data in is what users of your API would be using the data for and with.

Maybe you need to support legacy systems where JSON parsing is not feasible and XML is more desirable, or maybe it makes more sense for you to output data in the CSV format for easy import into spreadsheet applications. Whichever you choose, it’s important to think about your users and their use cases.

You can also consider adding support for multiple output formats. The best way to handle this is to look for the Accept header in the request and serve up a response based on the mime-type requested by the user. This approach is great because it’s very semantic and uses built-in features from the HTTP protocol. Here’s an example:

GET /v1/geocode HTTP/1.1
Host: api.geocod.io
Accept: application/json	GET /v1/geocode HTTP/1.1
Host: api.geocod.io
Accept: application/xml
Should return a JSON response	Should return an XML response
 

Supporting multiple formats, however, is rarely necessary. If you’re in doubt which format you should pick, I would recommend going with JSON as it is concise and can be easier to read as well. Always remember to pick a default response type if the Accept header is not set or it’s set to an unsupported type.

Versioning

This is a very important aspect that is often overlooked. As an API provider, one of your most important tasks is to make sure that breaking changes will never occur in your API. Making breaking changes will make life difficult for the developers who depend on your service and can easily start causing frustration when things start to break.

But don’t worry! This is where versioning comes in handy. There are a lot of options for versioning your API. For example, WePay uses an Api-Version header, and Twilio uses a similar approach putting the version date in the URL.

My favorite approach is a simple vX URL prefix, which is used by Github and many others. This allows you to easily deploy a new version of the API, e.g. /v2, and also access different versions of the API directly in the browser (no header changes or other fancy things here).

Here’s an example:

GET /v1/geocode HTTP/1.1
Host: api.geocod.io	GET /v2/geocode HTTP/1.1
Host: api.geocod.io
Should return the geocode endpoint from version 1.0 of the API	Should return the geocode endpoint from version 2.0 of the API
URL Structure

The URL structure is one of the most important pieces of the puzzle. Spending some time to define the right endpoint names can make your API much easier to understand and also help making the API more predictable.

URLs should be short and descriptive and utilize the natural hierarchy of the path structure. It’s also important to be consistent with pluralization.

If you are working with objects, keep the object id in the URL and leave everything else to the query string.

Let’s take a store locator API as an example. Here are some possible endpoints:

/v1/stores/1234 – Return the store that has id 1234
/v1/stores/1234/report – Report an error for the store with id 1234
/v1/stores – Return all stores
/v1/stores/near?lat=12.34&lon=-12.34 – Find stores near a given location
/v1/categories – Return a list of store categories
If you allow modification of objects, HTTP verbs are you friend. By applying those to your existing URLs, you will end up with a semantic solution to perform CRUD operations. Here is a list of verbs and their meaning:

HTTP Verb	Description
GET	This is the most common verb, and is used to retrieve data, e.g. GET /v1/stores/1234
PUT	PUT requests are commonly used to update/replace an object, e.g. PUT /v1/stores/1234
POST	This is used to create a new instance of an object, e.g. POST /v1/stores
DELETE	As the name suggests, this will delete the object, e.g. DELETE /v1/stores/1234
Authentication

There are many ways to handle authentication, here are three ideas.

If your API has user-based authentication, OAuth is really the way to go. It might look terribly confusing at first glance, but give it a chance. It’s the only widely-used, proven, and secure solution out there it’s being used by all major API providers and is very well tested.

If you just need to password protect your API, HTTP Basic Authentication is a nice and semantic way to go.

The only issue is if you want to provide an API key or other sorts of single-string authentication. Some people suggest using HTTP Basic Authentication with the API Key as both username and password or just leave the password blank, but really that’s a messy way of doing it if you ask me.

In that case I would recommend simply appending the API key to the query string, e.g. api.geocod.io/v1/geocode?q=42370 Bob Hope Drive, Rancho Mirage CA&api_key=YOUR_API_KEY

Don’t bother adding the API Key as a header or another fancy solution like that. By adding it as a query string parameter, the user will be able to test your API directly in a regular browser without any bells and whistles.

Timestamps

One of the common pitfalls of API design is to make sure you get timestamps right from the beginning. Don’t use Unix Timestamps as they don’t have timezone support and are not human readable (among a lot of other reasons) — Facebook learned this the hard way.

A widely-accepted standard for timestamps is ISO-8601. It is easy to read, easy to parse and it has great timezone support.

Error handling

The last thing on our list is error handling. There’s a lot of different kinds of errors you need to handle in your API, including permission errors (You are not allowed to delete this store), validation errors (Please specify a name for the store), not found errors, or even internal server errors.

You should always return a semantic HTTP status code with your requests. So for example, no errors would be a 200 OK, permission errors could be 403 Forbidden, and validation errors could be 422 Unprocessable Entity (http://httpstatus.es has a great human-readable list of available status codes).

In addition to the status code you, should always return an error message if necessary with a more detailed description of what happened. My favorite way of doing this is simply to respond with an “errors” key that has the error message as the value.

Example:

{
    error: "Invalid API key"
}


## cURL examples
   
We recommend always illustrating your API call documentation by cURL examples. Readers can simply cut-and-paste them, and they remove any ambiguity regarding call details.

```
CURL –X POST \
-H "Accept: application/json" \
-d '{"state":"running"}' \
https://api.fakecompany.com/v1/clients/007/orders
```

## Average granularity

The “one resource = one URL” theory tends to increase the number of resources. It’s important to keep a reasonable limit.

For instance : a person contains an address that in turn contains a country.

It’s important to avoid making 3 API calls…

1
2
3
4
5
6
7
CURL https://api.fakecompany.com/v1/users/1234
&lt; 200 OK
&lt; {"id":"1234", "name":"Antoine Jaby", "address":"https://api.fakecompany.com/v1/addresses/4567"}CURL https://api.fakecompany.com/addresses/4567
&lt; 200 OK
&lt; {"id":"4567", "street":"sunset bd", "country": "http://api.fakecompany.com/v1/countries/98"}CURL https://api.fakecompany.com/v1/countries/98
&lt; 200 OK
&lt; {"id":"98", "name":"France"}
…especially since these 3 pieces of information are commonly used together. This could lead to performance issues.

On the other hand, accumulating too much information a priori is likely to make API calls and exchanges too verbose.

Designing an API with an optimal granularity is not straightforward. It is often cultural and is the result of past API design experiences. In doubt, try to avoid exchanges becoming too big or too specific.

Medium GranularityPragmatically, we recommend:

Grouping only resources that are almost always accessed together
Not embedding collections having many components. For example, a list of current jobs is limited (it’s difficult to have more than 2 or 3 jobs at the same time) but a list of past work experiences can be much longer.
Having at most 2 levels of nested objects (e.g. /v1/users/addresses/countries)

## API domain names

In terms of domain names, All Web Giants don’t have the same practices. Some of them, such as Dropbox, use several domains or subdomains for their APIs.

To normalize domain names while keeping affordance in mind, we recommend using only 3 subdomains for your production environment :

API – https://api.{fakecompany}.com
OAuth2 – https://oauth2.{fakecompany}.com
Developer portal – https://developers.{fakecompany}.com

subdivision is intended to help developers easily figure out how to:

Effectively consume the API
Get an OAuth2 token to consume the API
Access the API developer portal
Some Web Giants, like Paypal, also provide a sandbox environment, which is very useful for testing the API before using it live on the production environment:

https://developer.paypal.com/docs/api/

We recommend using 2 subdomains for your sandbox environment :

OAuth2 – https://oauth2.sandbox.{fakecompany}.com
API – https://api.sandbox.{fakecompany}.com

## Security

Two protocols are widely used to secure REST APIs:

OAuth1 : http://tools.ietf.org/html/rfc5849
OAuth2 : http://tools.ietf.org/html/rfc6749

Unlike OAuth1, OAuth2 allows you to manage authentication and resource authorization for any type of application (native mobile app, native tablet app, JavaScript app, server side web app, batch processing…) with or without the resource owner’s consent.
OAuth2 is the de facto standard for securing APIs. Using another technology would slow down your API development and adoption.
Finally, resource security is a complex problem, and a homemade solution would most certainly result in security flaws.
With regard to OAuth2 token validation, we recommend implementing Google’s solution, implicit grant flow:

https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
http://en.wikipedia.org/wiki/Confused_deputy_problem
 

We recommend always using HTTPS wwhen communicating with :

OAuth2 providers
API providers
 

To validate your OAuth2 implementation, you might want to try the following test:

Develop a client consuming your OAuth2 implementation and make a call to your API
Then, replace the domain names of your API with Google’s API domain names.