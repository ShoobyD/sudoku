
/*
 * general utils
 */

if ( window.$ && $.fn ) {

	$.fn.extend( {
		'isOrHas' : function( elm ) {
			return this.is( elm ) || this.has( elm ).length;
		},
	} );

}


