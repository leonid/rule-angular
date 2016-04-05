import d3 from 'd3'

class GraphEditor {
  constructor() {
    this.width = 960
    this.height = 500
    this.fill = d3.scale.category20()

    // mouse event vars
    this.SELECTED_NODE = null
    this.SELECTED_LINK = null
    this.MOUSEDOWN_LINK = null
    this.MOUSEDOWN_NODE = null
    this.MOUSEUP_NODE = null

    // init svg
    var outer = d3.select( '#chart' )
      .append( 'svg:svg' )
      .attr( 'width', this.width )
      .attr( 'height', this.height )
      .attr( 'pointer-events', 'all' )

    var vis = outer
      .append( 'svg:g' )
      .call( d3.behavior.zoom().on( 'zoom', this.rescale ) )
      .on( 'dblclick.zoom', null )
      .append( 'svg:g' )
      .on( 'mousemove', this.mousemove )
      .on( 'mousedown', this.mousedown )
      .on( 'mouseup', this.mouseup )

    vis.append( 'svg:rect' )
      .attr( 'width', this.width )
      .attr( 'height', this.height )
      .attr( 'fill', 'white' )

    // init force layout
    this.force = d3.layout.force()
      .size( [this.width, this.height] )
      .nodes( [{}] ) // initialize with a single node
      .linkDistance( 50 )
      .charge( -200 )
      .on( 'tick', this.tick )

    // line displayed when dragging new nodes
    this.dragLine = vis.append( 'line' )
      .attr( 'class', 'dragLine' )
      .attr( 'x1', 0 )
      .attr( 'y1', 0 )
      .attr( 'x2', 0 )
      .attr( 'y2', 0 )

    // get layout properties
    this.nodes = this.force.nodes()
    this.links = this.force.links()
    this.node = this.vis.selectAll( '.node' )
    this.link = this.vis.selectAll( '.link' )

    // add keyboard callback
    d3.select( window )
      .on( 'keydown', this.keydown )

    this.redraw()

    // focus on svg
    // vis.node().focus()

  }

  mousedown() {
    if ( !this.MOUSEDOWN_NODE && !this.MOUSEDOWN_LINK ) {
      // allow panning if nothing is selected
      this.vis.call( d3.behavior.zoom().on( 'zoom' ), this.rescale )
      return
    }
  }

  mousemove() {
    if ( !this.MOUSEDOWN_NODE ) {
      return
    }

    // update drag line
    dragLine
      .attr( 'x1', this.MOUSEDOWN_NODE.x )
      .attr( 'y1', this.MOUSEDOWN_NODE.y )
      .attr( 'x2', d3.svg.mouse( this )[0] )
      .attr( 'y2', d3.svg.mouse( this )[1] )

  }

  mouseup() {
    if ( this.MOUSEDOWN_NODE ) {
      // hide drag line
      this.dragLine
        .attr( 'class', 'dragLine_hidden' )

      if ( !this.MOUSEUP_NODE ) {
        // add node
        var point = d3.mouse( this ),
          node = {x: point[0], y: point[1]},
          n = nodes.push( node )

        // select new node
        this.SELECTED_NODE = node
        this.SELECTED_LINK = null

        // add link to mousedown node
        this.links.push( {source: this.MOUSEDOWN_NODE, target: node} )
      }

      this.redraw()
    }

    // clear mouse event vars
    this.resetMouseVars()
  }

  resetMouseVars() {
    this.MOUSEDOWN_NODE = null
    this.MOUSEUP_NODE = null
    this.MOUSEDOWN_LINK = null
  }

  tick() {
    this.link.attr( 'x1', ( d ) => {
      return d.source.x
    } )
      .attr( 'y1', ( d ) => {
        return d.source.y
      } )
      .attr( 'x2', ( d ) => {
        return d.target.x
      } )
      .attr( 'y2', ( d ) => {
        return d.target.y
      } )

    this.node.attr( 'cx', ( d ) => {
      return d.x
    } )
      .attr( 'cy', ( d ) => {
        return d.y
      } )
  }

// rescale g
  rescale() {
    let trans = d3.event.translate
    let scale = d3.event.scale

    this.vis.attr( 'transform',
      'translate(' + trans + ')' +
      ' scale(' + scale + ')' )
  }

// redraw force layout
  redraw() {

    this.link = this.link.data( this.links )

    this.link.enter().insert( 'line', '.node' )
      .attr( 'class', 'link' )
      .on( 'mousedown',
        ( d ) => {
          this.MOUSEDOWN_LINK = d
          if ( this.MOUSEDOWN_LINK == this.SELECTED_LINK ) {
            this.SELECTED_LINK = null
          } else {
            this.SELECTED_LINK = this.MOUSEDOWN_LINK
          }

          this.SELECTED_NODE = null
          this.redraw()
        } )

    this.link.exit().remove()

    this.link
      .classed( 'link_selected', ( d ) => {
        return d === this.SELECTED_LINK
      } )

    this.node = this.node.data( this.nodes )

    this.node.enter().insert( 'circle' )
      .attr( 'class', 'node' )
      .attr( 'r', 5 )
      .on( 'mousedown',
        ( d ) => {
          // disable zoom
          this.vis.call( d3.behavior.zoom().on( 'zoom' ), null )

          this.MOUSEDOWN_NODE = d
          if ( this.MOUSEDOWN_NODE == this.SELECTED_NODE ) {
            this.SELECTED_NODE = null
          } else {
            this.SELECTED_NODE = this.MOUSEDOWN_NODE
          }

          this.SELECTED_LINK = null

          // reposition drag line
          this.dragLine
            .attr( 'class', 'link' )
            .attr( 'x1', this.MOUSEDOWN_NODE.x )
            .attr( 'y1', this.MOUSEDOWN_NODE.y )
            .attr( 'x2', this.MOUSEDOWN_NODE.x )
            .attr( 'y2', this.MOUSEDOWN_NODE.y )

          this.redraw()
        } )
      .on( 'mousedrag',
        ( d ) => {
          // this.redraw()
        } )
      .on( 'mouseup',
        ( d ) => {
          if ( this.MOUSEDOWN_NODE ) {
            this.MOUSEUP_NODE = d
            if ( this.MOUSEUP_NODE == this.MOUSEDOWN_NODE ) {
              this.resetMouseVars()
              return
            }

            // add link
            var link = {source: this.MOUSEDOWN_NODE, target: this.MOUSEUP_NODE}
            this.links.push( link )

            // select new link
            this.SELECTED_LINK = link
            this.SELECTED_NODE = null

            // enable zoom
            this.vis.call( d3.behavior.zoom().on( 'zoom' ), this.rescale )
            this.redraw()
          }
        } )
      .transition()
      .duration( 750 )
      .ease( 'elastic' )
      .attr( 'r', 6.5 )

    this.node.exit().transition()
      .attr( 'r', 0 )
      .remove()

    this.node
      .classed( 'node_selected', ( d ) => {
        return d === this.SELECTED_NODE
      } )

    if ( d3.event ) {
      // prevent browser's default behavior
      d3.event.preventDefault()
    }

    this.force.start()

  }

  spliceLinksForNode( node ) {
    let toSplice = this.links.filter(
      ( l ) => {
        return (l.source === node) || (l.target === node)
      } )

    toSplice.map(
      ( l ) => {
        this.links.splice( this.links.indexOf( l ), 1 )
      } )
  }

  keydown() {
    if ( !this.SELECTED_NODE && !this.SELECTED_LINK ) {
      return
    }

    switch ( d3.event.keyCode ) {
      case 8: // backspace
      case 46: { // delete
        if ( this.SELECTED_NODE ) {
          this.nodes.splice( this.nodes.indexOf( this.SELECTED_NODE ), 1 )
          this.spliceLinksForNode( this.SELECTED_NODE )
        } else if ( this.SELECTED_LINK ) {
          this.links.splice( this.links.indexOf( this.SELECTED_LINK ), 1 )
        }

        this.SELECTED_LINK = null
        this.SELECTED_NODE = null
        this.redraw()
        break
      }
    }
  }

}

export default GraphEditor
