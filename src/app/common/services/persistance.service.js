'use strict'

var app = angular.module('gotoco.services')


/**
 * PersistenceService wrap calls to the storage layer, currently IndexedDB (or an emulation on Android and IOS)
 *
 */
app.factory('PersistenceService', ['$log', '$window', '$q', 'DATABASE', function ($log, $window, $q, DATABASE) {
  $log.debug('Intialize persistence service')

  var database = $q.defer()

  var dbOpenRequest = $window.indexedDB.open(DATABASE.name, DATABASE.version)

  dbOpenRequest.onerror = function (evt) {
    $log.error('[Persistence] Cannot open database ' + evt.target.error.message)
    database.reject(evt.target.error.message)
  }

  dbOpenRequest.onsuccess = function () {
    database.resolve(dbOpenRequest.result)
    $log.info('[Persistence] Database ' + DATABASE.name + ' version ' + DATABASE.version + ' opened')
  }

  dbOpenRequest.onupgradeneeded = function (evt) {
    $log.info('[Persistence] Upgrading database')
    var db = evt.target.result
    var knownStores = db.objectStoreNames
    for (var store in DATABASE.stores) {
      $log.debug('[Persistence] need store ' + store + ']')
      if (DATABASE.stores.hasOwnProperty(store) && typeof (knownStores) === 'undefined' || !knownStores.contains(store)) {
        var objectStore = db.createObjectStore(DATABASE.stores[store], {keyPath: 'id'})
        if (DATABASE.stores[store] === 'Sessions') {
          objectStore.createIndex('track', 'trackIds', {unique: false, multiEntry: true})
          objectStore.createIndex('speaker', 'speakerNames', {unique: false, multiEntry: true})
        }

        if (DATABASE.stores[store] === 'Speakers') {
          objectStore.createIndex('name', 'name', {unique: false, multiEntry: true})
        }

        $log.info('[Persistence] store "' + store + '" successfully created')
      }
    }

  }


  /* ======================================================================= */
  function get(store, id) {
    // this will hold the final result
    var deferred = $q.defer()

    /*
     * (0) wait before executing the query until the database is opened
     * (1) open datastore and execute get request
     * (2) fulfill or reject promise
     * (N) log error in any case
     */
    database.promise
      .then(function (db) {
        $log.debug('[Persistence] Database connected')
        var objectStore = db.transaction([store]).objectStore(store)
        $log.debug('[Persistence] execute query...')
        var request = objectStore.get(id)

        request.onerror = function (evt) {
          $log.warn('Query failed' + evt.target.error.message + ' : ' + evt.target.error.code)
          deferred.reject(evt.target.error.message)
        }
        request.onsuccess = function (evt) {
          $log.debug('[Persistence] got data result')
          var obj = evt.target.result
          deferred.resolve(obj)
        }
      })
      .catch(function (evt) {
        $log.warn('[Persistence] error' + evt)
      })
    return deferred.promise
  }

  function all(store, mapper) {
    var deferred = $q.defer()

    database.promise
      .then(function (db) {
        $log.debug('[Persistence] Database connected')
        var objectStore = db.transaction([store]).objectStore(store)
        $log.debug('[Persistence] execute query on store ['+store+']... ')
        var request = objectStore.openCursor()
        var result = []
        request.onsuccess = function (evt) {
          var cursor = evt.target.result
          if (cursor) {
            var val = cursor.value
            result.push(val)
            cursor.continue()
          }
          else {
            $log.debug('No more entries!')
            if( typeof(mapper) === 'function') {
              deferred.resolve(mapper(result))
            }
            else {
              deferred.resolve(result)
            }
          }
        }
        request.onerror = function (evt) {
          $log.warn('[Persistence] Query failed' + evt.target.error.message + ' : ' + evt.target.error.code)
          deferred.reject(evt.target.error.message)
        }
      })

    return deferred.promise
  }

  function put(store, object) {
    var deferred = $q.defer()
    if (typeof(object.id) === 'undefined') {
      deferred.reject('Cannot insert undefined object')
    }
    else {

      database.promise
        .then(function (db) {
          $log.debug('[Persistence] Database connected')
          $log.debug('[Pesistence] --> Put session to database')

          var tx = db.transaction([store], 'readwrite')
          tx.oncomplete = function () {
            $log.debug('[Persistence] tx finished')
          }

          tx.onerror = function (evt) {
            $log.error('[Persistence] Cannot complete transaction ' + evt.target.errorCode)
          }

          var objStore = tx.objectStore(store)
          var request = objStore.add(object)

          request.onsuccess = function (evt) {
            $log.debug('[Persistence] successfully added [' + object + ']')
            deferred.resolve(evt.target.result)
          }

          request.onerror = function (evt) {
            $log.error('[Persistence] Could add object (' + evt.target.error.message + ') for [' + object + ']')
            deferred.reject(evt.target.error.message)
          }
        }).
      catch(function (evt) {
        $log.error('[Persistence] Could add object (' + evt.target.error.message + ') for [' + object + ']')
      })
    }
    return deferred.promise
  }

  function clearStore(store) {
    var deferred = $q.defer()

    database.promise
      .then(function (db) {
        var objStore = db.transaction(store, 'readwrite').objectStore(store)
        var request = objStore.clear()

        request.onsuccess = function () {
          $log.info('[Persistence] Datastore cleared!')
          deferred.resolve()
        }
        request.onerror = function (evt) {
          $log.error('[Persistence] Could not clear sessions from datastore: ' + evt.target.error.message)
          deferred.reject(evt.target.error)
        }
      })
      .catch(function (evt) {
        $log.error('[Persistence] Could not delete sessions from datastore: ' + evt.target.error.message)
        deferred.reject(evt.target.error)
      })

    return deferred.promise
  }

  function remove(store,id) {
    var deferred = $q.defer()

    database.promise
      .then(function (db) {
        var objStore = db.transaction(store, 'readwrite').objectStore(store)
        var request = objStore.delete(id)

        request.onsuccess = function () {
          $log.info('[Persistence] entry with id '+id+'removed!')
          deferred.resolve(id)
        }
        request.onerror = function (evt) {
          $log.error('[Persistence] Could not remove entry from datastore: ' + evt.target.error.message)
          deferred.reject(evt.target.error)
        }
      })
      .catch(function (evt) {
        $log.error('[Persistence] Could not delete sessions from datastore: ' + evt.target.error.message)
        deferred.reject(evt.target.error)
      })

    return deferred.promise
  }

  /* ======================================================================= */

  /**
   * get all sessions from datastore
   */
  var getSessions = function () {
    $log.debug('[Persistence] Get sessions from database')
    return all(DATABASE.stores.sessions, function (result) {
      return {
        result: {
          allSessions: result
        }
      }
    })
  }


  /**
   * Get a single session from the store
   * @param id of the session
   * @returns {promise|*} promise will fulfilled with the result, otherwise rejected with the error messsage
   */
  var getSession = function (id) {
    $log.debug('[Persistence] Get session data from database')

    return get(DATABASE.stores.sessions, id)
  }


  var putSession = function (session) {
    $log.debug('[Persistence] try add session with id ' + session.id)
    return put(DATABASE.stores.sessions, session)
  }


  var deleteSessions = function () {
    $log.info('[Persistence] deleteing all session data')
    return clearStore(DATABASE.stores.sessions)
  }

  // Tracks

  /**
   * get all sessions from datastore
   */
  var getTracks = function () {
    $log.debug('[Persistence] Get tracks from database')
    return all(DATABASE.stores.tracks, function (result) {
      return {result: result}
    })
  }


  /**
   * Get a single session from the store
   * @param id of the session
   * @returns {promise|*} promise will fulfilled with the result, otherwise rejected with the error messsage
   */
  var getTrack = function (id) {
    $log.debug('[Persistence] Get track data from database')

    return get(DATABASE.stores.tracks, id)
  }


  var putTrack = function (track) {
    $log.debug('[Persistence] try add track with id ' + track.id)
    return put(DATABASE.stores.tracks, track)
  }


  var deleteTracks = function () {
    $log.info('[Persistence] deleteing all track data')
    return clearStore(DATABASE.stores.tracks)
  }

  var sessionsByTrack = function (trackId) {
    $log.info('[Persistence] searching sessions for track')
    var deferred = $q.defer()

    database.promise
      .then(function (db) {
        $log.debug('[Persistence] Database connected')
        var objectStore = db.transaction([DATABASE.stores.sessions]).objectStore(DATABASE.stores.sessions)
        var index = objectStore.index('track')
        var request = index.openCursor()
        var result = []

        request.onerror = function (evt) {
          $log.warn('Query failed' + evt.target.error.message + ' : ' + evt.target.error.code)
          deferred.reject(evt.target.error.message)
        }

        request.onsuccess = function (evt) {
          var cursor = evt.target.result
          if (cursor) {
            var val = cursor.value
            if (typeof(val) !== 'undefined' && typeof(val.trackIds) !== 'undefined' && val.trackIds.indexOf(trackId) !== -1) {
              result.push(val)
            }
            cursor.continue()
          }
          else {
            $log.debug('No more entries!')
            deferred.resolve(result)
          }
        }
      })

    return deferred.promise
  }

  var getSpeaker = function (id) {
    $log.debug('[Persistence] Get track data from database')

    return get(DATABASE.stores.speakers, id)
  }


  var putSpeaker = function (track) {
    $log.debug('[Persistence] try add track with id ' + track.id)
    return put(DATABASE.stores.speakers, track)
  }

  var deleteDatabase = function() {
    $log.info('Deleting whole database')

    var deferred = $q.defer()

    var request = $window.indexedDB.deleteDatabase(DATABASE.name)
    request.oncomplete = function() {
      deferred.resolve()
    }

    request.onerror = function(evt) {
      deferred.reject(evt.target.error)
    }

    return deferred.promise
  }

  var addSession = function(id) {
    $log.debug('Add session to my schedule')
    return put(DATABASE.stores.mySessions, id)
  }

  var getSessionFromMySchedule = function(id) {
    $log.debug('Getting session from schedule')
    return get(DATABASE.stores.mySessions, id)
  }


  var removeSession = function(id) {
    $log.debug('Removing session from schedule')
    return remove(DATABASE.stores.mySessions, id)
  }

  var getMySchedule = function() {
    $log.debug('Get all sessions from schedule')

    return all(DATABASE.stores.mySessions,function(ids) {
      return ids.map(function(id) {return id.id})
    })
  }

  var deleteMySessions = function() {
    $log.info('[Persistence] deleteing all track data')
    return clearStore(DATABASE.stores.mySessions)
  }

  return {
    deleteDatabase: deleteDatabase,
    getSessions: getSessions,
    getSession: getSession,
    putSession: putSession,
    deleteSessions: deleteSessions,
    getTracks: getTracks,
    getTrack: getTrack,
    putTrack: putTrack,
    deleteTracks: deleteTracks,
    sessionsByTrack: sessionsByTrack,
    putSpeaker: putSpeaker,
    getSpeaker: getSpeaker,
    addSession: addSession,
    removeSession: removeSession,
    getSessionFromMySchedule: getSessionFromMySchedule,
    getMySchedule: getMySchedule,
    deleteMySessions: deleteMySessions
  }
}])