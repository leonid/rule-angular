'use strict';

import template from './availability.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.availability', {
  url: '/availability',
  template: '<availability></availability>',
  data: {
    access: ACCESS_LEVELS.employee
  }
} )
@Component( {
  selector: 'availability'
} )
@View( {
  template: template
} )
@Inject( '$scope', 'AvailabilityService' )
class Availability {
  constructor( $scope, AvailabilityService ) {
    this.calendarViews = [{id: 'me', label: 'My Availability'}, {
      id: 'everyone',
      label: 'Everyone\'s Availability'
    }];
    this.calendarView = this.calendarViews[0].id;
    this.calendarData = AvailabilityService.getCalendarData( this );
    this.calendarConfig = AvailabilityService.getCalendarConfig( $scope, this.calendarViews[0].id );
    this.AvailabilityService = AvailabilityService;
    this.$scope = $scope;
  }

  toggleView( view ) {
    this.calendarData = this.AvailabilityService.getCalendarData( this );
    this.calendarConfig = this.AvailabilityService.getCalendarConfig( this.$scope, view );
  }
}

export default Availability;
// !!! http://24days.in/umbraco/2014/extending-umbraco-7-backend/extend-with-angularjs-and-typescript/
// !! http://calendar.demo.title.dk/calendar/
// !! https://www.silverstripe.org/blog/managing-events-with-silverstripe-a-new-calendar-module/ --> check ORM model schema
