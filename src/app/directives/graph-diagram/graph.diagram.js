'use strict'

import d3 from 'd3'

import {Directive, Inject} from '../../decorators/decorators'

@Directive( {
  selector: 'd3-diagram'
} )
@Inject('$timeout')
class D3Diagram {
  constructor() {
    this.restrict = 'E'
    this.replace = false
    this.scope = {
      height: '=',
      width: '=',
      gridSize: '=',
      graph: '='
    }
  }

  link( scope, element, attrs ) {

    // set up SVG for D3
    var colors = d3.scale.category20()

    var svg = d3.select( element[0] )
      .append( 'svg' )
      .attr( 'oncontextmenu', 'return false;' )
      .attr( 'width', scope.width )
      .attr( 'height', scope.height )

    var nodes = [
      {
        "name": "Top Level",
        "parent": "null",
        "children": [
          {
            "name": "Level 2: A",
            "parent": "Top Level",
            "children": [
              {
                "name": "Son of A",
                "parent": "Level 2: A"
              },
              {
                "name": "Daughter of A",
                "parent": "Level 2: A"
              }
            ]
          },
          {
            "name": "Level 2: B",
            "parent": "Top Level"
          }
        ]
      }
    ]
    var links = scope.graph.links
    var lastNodeId = scope.graph.lastNodeId

    var nodeById = d3.map()

    nodes.forEach( function ( node ) {
      nodeById.set( node.id, node )
    } )
    //
    // nodes.map(function(d) {
    //   return {'name': d}
    // })

    links.forEach( function ( link ) {


      if ( typeof link.source == 'number' ) {

        // "Uncaught TypeError: Cannot read property 'weight' of undefined"
        if ( typeof nodes[link.source] === 'undefined' ) {
          nodes[link.source] = {
            id: link.source,
            reflexive: 'true',
            name: 'XXX',
            weight: 1
          }
          console.log( 'undefined source', link.source )
        }
        link.source = nodes[link.source]
      } else {
        link.source = nodeById.get( link.source )
      }


      if ( typeof link.target == 'number' ) {

        if ( typeof nodes[link.target] === 'undefined' ) {
          nodes[link.target] = {
            id: link.target,
            reflexive: 'true',
            name: 'XXX',
            weight: 1
          }

          console.log( 'undefined target', link.target );
        }

        link.target = nodes[link.target]
      } else {
        link.target = nodeById.get( link.target )
      }


    } )


// init D3 force layout
    var force = d3.layout.force()
      .nodes( nodes )
      .links( links )
      .size( [scope.width, scope.height] )
      .linkDistance( 150 )
      .charge( -200 )
      .start()
    // .on('tick', tick)

    var link = svg.selectAll( ".link" )
      .data( links )
      .enter().append( "line" )
      .attr( "class", "link" )

    var node = svg.selectAll( ".node" )
      .data( nodes )
      .enter().append( "circle" ) // If you wonder why enter() is used, see the documentation
      .attr( "class", "node" )
      .attr( "r", 5 )
      .style( "fill", function ( d ) {
        return "red";
      } )
      .call( force.drag );

    force.on( "tick", function () {
      link.attr( "x1", function ( d ) {
          return d.source.x;
        } )
        .attr( "y1", function ( d ) {
          return d.source.y;
        } )
        .attr( "x2", function ( d ) {
          return d.target.x;
        } )
        .attr( "y2", function ( d ) {
          return d.target.y;
        } );

      node.attr( "cx", function ( d ) {
          return d.x;
        } )
        .attr( "cy", function ( d ) {
          return d.y;
        } );
    } )

  }

  static directiveFactory() {
    D3Diagram.instance = new D3Diagram()
    return D3Diagram.instance
  }
}

export default D3Diagram
