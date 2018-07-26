
/*==*==*==*==*==*==*==*==*
 *     General Utils     *
 *==*==*==*==*==*==*==*==*/

/*
 * jQuery extend
 */
if ( window.$ && $.fn ) {

	$.fn.extend( {
		'isOrHas' : function( elm ) {
			elm = elm || document.activeElement;
			return this.is( elm ) || this.has( elm ).length;
		},
	} );

}



/*
 * Dialog
 */
function Dialog() {

	const $dialog   = $( '<dialog>' )
		.appendTo( document.body );

	const $content  = $( '<div class="content">' )
		.click( selectText )
		.appendTo( $dialog );

	const $closeBtn = $( '<button>' )
		.addClass( 'closeBtn' )
		.html( 'Close' )
		.click( close )
		.appendTo( $dialog );

	$( document )
		.click( function( e ) {
			if ( !$dialog.isOrHas( e.target ) ) close();
		} )
		.keydown( function( e ) {
			if ( e.which === KEYCODES.ESC ) close();
		} );

	function selectText() {

		getSelection().selectAllChildren( $content[ 0 ] );

	}

	function open( msg ) {

		$content.html( msg + '\n' );
		$dialog.prop( 'open', true );

	}

	function close() {

		$dialog.prop( 'open', false );

	}

	return {
		open,
		close,
	};

}


