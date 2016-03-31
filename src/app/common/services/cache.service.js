'use strict';

var app = angular.module('gotoco.services');

/**
 * Facilitate data access by either loading it from the persistance layer or from remote site. Api should be
 * interchargeable with {@code SessionService}.
 */
app.factory('CacheService', ['$q', '$log', 'SessionService', 'TrackService', 'PersistenceService', function ($q, $log, SessionService, TrackService, PersistenceService) {
  return {
    queryForSessions: function (params) {
      $log.debug('proxying object');
      var value = {};
      var deferred = $q.defer();


      PersistenceService.getSessions()
        .then(function (data) {
          $log.debug('[CacheService] Got cached data:' + data);
          if (data.result.allSessions.length === 0 || typeof(data.result.allSessions) === 'undefined' || typeof(data.result) === 'undefined' || typeof(data) === 'undefined') {
            SessionService.query(params).$promise
              .then(deferred.resolve)
              .catch(deferred.reject);
          }
          else {
            deferred.resolve(data);
          }
        })
        .catch(deferred.reject);

      value.$promise = deferred.promise;
      return value;
    },
    getSession: function (params) {
      $log.debug('proxying object');
      var value = {};
      var deferred = $q.defer();

      PersistenceService.getSession(params.sessionId)
        .then(function (data) {
          $log.debug('[CacheService] Got cached data:' + data);
          if (typeof(data) === 'undefined') {
            SessionService.get(params).$promise
              .then(function (loadedData) {
                var result = loadedData.result;
                PersistenceService.putSession(result)
                  .then(function () {
                    $log.debug('[CacheService] object successfully put to cache');
                  })
                  .catch(function () {
                    $log.warn('[CacheService] could not cache object');
                  })
                  .finally(function () {
                    $log.debug('[CacheService] returning result for ' + params.sessionId);
                    deferred.resolve(result);
                  });
                angular.forEach(result.speakers, function (speaker) {
                  PersistenceService.putSpeaker(speaker)
                    .then(function () {
                      $log.debug('[CacheService] object successfully put to cache');
                    })
                    .catch(function () {
                      $log.warn('[CacheService] could not cache object');
                    });
                });

              })
              .catch(deferred.reject);
          }
          else {
            deferred.resolve(data);
          }
        })
        .catch(deferred.reject);

      value.$promise = deferred.promise;
      return value;
    },
    queryForTracks: function (params) {
      $log.debug('[CacheSevice] tracks...');
      var value = {};
      var deferred = $q.defer();


      PersistenceService.getTracks()
        .then(function (data) {
          $log.debug('[CacheService] Got cached data:' + data);
          if (typeof(data) === 'undefined' || typeof(data.result) === 'undefined' || data.result.length === 0) {
            TrackService.query(params).$promise
              .then(deferred.resolve)
              .catch(deferred.reject);
          }
          else {
            deferred.resolve(data);
          }
        })
        .catch(deferred.reject);

      value.$promise = deferred.promise;

      return value;
    },
    getTrack: function (params) {
      $log.debug('proxying object');
      var value = {};
      var deferred = $q.defer();


      PersistenceService.getTrack(params.trackId)
        .then(function (data) {
          $log.debug('[CacheService] Got cached data:' + data);
          if (typeof(data) === 'undefined') {
            TrackService.get(params).$promise
              .then(function (loadedData) {
                var result = loadedData.result;
                PersistenceService.putTrack(result)
                  .then(function () {
                    $log.debug('[CacheService] object successfully put to cache');
                  })
                  .catch(function () {
                    $log.warn('[CacheService] could not cache object');
                  })
                  .finally(function () {
                    $log.debug('[CacheService] returning result for ' + params.sessionId);
                    deferred.resolve(result);
                  });
              })
              .catch(deferred.reject);
          }
          else {
            deferred.resolve(data);
          }
        })
        .catch(deferred.reject);


      value.$promise = deferred.promise;
      return value;

    },
    getSpeaker: function (params) {
      $log.debug('proxying object');
      var value = {};
      var deferred = $q.defer();


      PersistenceService.getSpeaker(params.speakerId)
        .then(deferred.resolve)
        .catch(deferred.reject);


      value.$promise = deferred.promise;
      return value;

    }
  };
}]);
