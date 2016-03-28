'use strict'

// import './add/resource.add'
// import './edit/resource.edit'
// import './view/resource.view'

import template from './plan.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.plan', {
  url: '/plan',
  template: '<plan></plan>',
  // resolve: {
  //   init: [
  //     'ResourceModel',
  //     (ResourceModel) => ResourceModel.initCollection(/*{pattern: 'грузы'}*/)
  //   ]
  // },
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@Component( {
  selector: 'plan'
} )
@View( {
  template: template
} )
@Inject( '$scope', '$state', 'flowChart' )
class Plan {
  constructor( $scope, $state, flowChart ) {
    this.chartViewModel = new flowChart.ChartViewModel( this.chartDataModel )

    this.chartDataModel = {

      nodes: [
        {
          name: "Example Node 1",
          id: 0,
          x: 0,
          y: 0,
          inputConnectors: [
            {
              name: "A",
            },
            {
              name: "B",
            },
            {
              name: "C",
            },
          ],
          outputConnectors: [
            {
              name: "A",
            },
            {
              name: "B",
            },
            {
              name: "C",
            },
          ],
        },

        {
          name: "Example Node 2",
          id: 1,
          x: 400,
          y: 200,
          inputConnectors: [
            {
              name: "A",
            },
            {
              name: "B",
            },
            {
              name: "C",
            },
          ],
          outputConnectors: [
            {
              name: "A",
            },
            {
              name: "B",
            },
            {
              name: "C",
            },
          ],
        },

      ],

      connections: [
        {
          source: {
            nodeID: 0,
            connectorIndex: 1,
          },

          dest: {
            nodeID: 1,
            connectorIndex: 2,
          },
        },


      ]
    };

    $scope.$watch( ()=> this.resources, this.resourcesChanged() )
  }

  resourcesChanged( newValue, oldValue ) {
    return () => {
      this.updatefilteredResources()
    }
  }
}

export default Plan
