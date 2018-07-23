
/*
 * constructor Sudoku
 */
function Sudoku( ELM_SEL, BLOCK_SIZE ) {

	try {
		$( ELM_SEL );
	} catch( err ) {
		console.error( 'Bad element selector.' );
		return;
	}

	// Inheritance function
	function inherits( ctor, superCtor ) {
		ctor.super_    = superCtor;
		ctor.prototype = Object.create( superCtor.prototype, {
			'constructor' : {
				'value'        : ctor,
				'enumerable'   : false,
				'writable'     : true,
				'configurable' : true,
			}
		} );
	};



	/*==*==*==*==*==*==*==*==*
	 *      Components       *
	 *==*==*==*==*==*==*==*==*/

	/*
	 * constructor Cell
	 */
	function Cell( x, y ) {

		this.x       = x;
		this.y       = y;
		this.value   = 0;
		this.options = new Set( DIGITS );

	};
	Cell.prototype.setValue = function( value ) {

		this.value   = value;
		this.options = new Set( [ value ] );

	};
	Cell.prototype.update = function() {

		if ( !this.value && this.options.size === 1 )
			this.setValue( this.options.values().next().value );

	};



	/*
	 * constructor Part
	 */
	function Part( index, sudoku ) {

	};
	Part.prototype.clear = function( value ) {

		for ( let cell of this.cells )
			cell.options.delete( value );

	};
	Part.prototype.update = function() {

		for ( let d of DIGITS ) {
			let unique = this.cells.filter( cell => cell.options.has( d ) );
			if ( unique.length === 1 ) {
				let cell = unique.pop();
				insert( cell.x, cell.y, d );
			}
		}

	};



	/*
	 * constructor Row
	 */
	function Row( index ) {

		this.index  = index;
		this.cells  = RANGE.map(
			this.isColumn?
				i => table[ i ][ index ]:
				i => table[ index ][ i ]
		);

	};
	inherits( Row, Part );



	/*
	 * constructor Column
	 */
	function Column() {

		this.isColumn = true;
		Column.super_.call( this, ...arguments );

	};
	inherits( Column, Row );



	/*
	 * constructor Block
	 */
	function Block( x, y ) {

		this.x      = x;
		this.y      = y;
		this.cells  = [];
		this.table  = BLOCK_RANGE.map(
			i => BLOCK_RANGE.map(
				j => {
					let cell = table[ x * BLOCK_SIZE + i ][ y * BLOCK_SIZE + j ];
					this.cells.push( cell );
					return cell;
				}
			)
		);

	};
	inherits( Block, Part );



	/*==*==*==*==*==*==*==*==*
	 *      General fn       *
	 *==*==*==*==*==*==*==*==*/

	function isDigit( x ) {

		return /^[0-9]$/.test( x );

	}

	const Arr2Grid = arr => `
		<grid>
			${ arr.map( ( row, i ) =>
				row.map(
					( cell, j ) => `<cell${ makeCellClass( cell ) }>${ cell.value || ( cell.options? Opt2Grid( cell.options ): ' ' ) }</cell>`
				).join( '' )
			).join( '' ) }
		</grid>
	`;

	const Opt2Grid = ( function() {
		const optGrids = {};
		return function( opts ) {
			const optsArr = Array.from( opts );
			return optGrids[ optsArr ] = optGrids[ optsArr ] || Arr2Grid( BLOCK_RANGE.map(
				i => BLOCK_RANGE.map(
					j => {
						return { isOpt: opts.has( i * BLOCK_SIZE + j + 1 ) };
					}
				)
			) );
		};
	} )();

	function makeCellClass( cell ) {

		let cls = [ cell.options? 'main': 'option' ];
		if ( cell.isOpt ) cls.push( 'optOn' );

		const xrem = cell.x % BLOCK_SIZE;
		const yrem = cell.y % BLOCK_SIZE;
		if ( xrem === 0 ) cls.push( 'top'  );
		if ( yrem === 0 ) cls.push( 'left' );
		if ( xrem === BLOCK_SIZE - 1 ) cls.push( 'bottom' );
		if ( yrem === BLOCK_SIZE - 1 ) cls.push( 'right'  );

		cls = cls.join( ' ' );
		return cls? ` class="${ cls }"`: '';

	}

	function Dialog() {

		$dialog   = $( '<dialog>' )
			.appendTo( $wrap );

		$content  = $( '<div class="content">' )
			.click( _ => selectText() )
			.appendTo( $dialog );

		$closeBtn = $( '<button>' )
			.html( 'Close' )
			.click( _ => close() )
			.appendTo( $dialog );

		$( document )
			.click( function( e ) {
				if ( !$dialog.isOrHas( e.target ) ) close();
			} )
			.keydown( function( e ) {
				if ( e.which === 27 ) close();
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



	/*==*==*==*==*==*==*==*==*
	 *       Sudoku fn       *
	 *==*==*==*==*==*==*==*==*/

	function BuildPanel() {

		const btnData = [
			[
				{
					'title' : 'Edit',
					'fn'    : _ => edit(),
				},
				{
					'title' : 'Show Options',
					'fn'    : _ => $sudoku.toggleClass( 'showoptions' ),
				},
				{
					'title' : '+',
					'fn'    : _ => ChangeSize( 6 ),
				},
				{
					'title' : '-',
					'fn'    : _ => ChangeSize( -6 ),
				},
				{
					'title' : 'Update',
					'fn'    : _ => update(),
				},
			],
			[
				{
					'title' : 'Set as base',
					'fn'    : _ => setBase(),
				},
				{
					'title' : 'Export Data',
					'fn'    : _ => {
						exportData();
						return false;
					},
				},
			],
		];
		const $panel = $( '<panel>' )
			.appendTo( $wrap );

		for ( let d of btnData ) {
			let $div = $( '<div>' ).appendTo( $panel );
			for ( let b of d ) {
				$( '<button>' )
					.html( b.title )
					.click( b.fn )
					.appendTo( $div );
			}
		}

		return $panel;

	}

	function setBase() {

	}

	function exportData() {

		dialog.open(
			table.map( ( row, i ) =>
				row.map(
					cell => cell.value || '-'
				).join( ' ' )
			).join( '<br>' )
		);

	}

	function edit( isAbort ) {

		const $allbtns = $panel.find( 'button' );
		const $btn     = $allbtns.first();
		const isEdit   = $btn.html() === 'Edit';

		$allbtns.not( $btn ).prop( 'disabled', isEdit );
		$btn.html( isEdit? 'Save': 'Edit' );
		$wrap.toggleClass( 'edit' );
		$sudoku.find( 'cell' ).prop( 'contentEditable', isEdit );
		if ( !isEdit && !isAbort ) save();

	}

	function abortEdit() {

		let isAbort = confirm( 'Abort edit?\nChanges will be lost.' );
		edit( true );
		render();

	}

	function save() {

		$sudoku.find( 'cell.main.changed' ).each( function() {

			const $this = $( this ).removeClass( 'changed' );
			const value = +$this.html();
			const index = $this.index();
			insert( ~~( index / SIZE ), index % SIZE, value );

		} );
		render();

	}

	function update() {

		for ( let cell of cells )
			cell.update();

		for ( let row of rows )
			row.update();

		for ( let col of cols )
			col.update();

		for ( let block of blocks.flat() )
			block.update();

		render();

	}
	function render() {

		$sudoku.find( 'grid' ).remove();
		$sudoku.prepend( Arr2Grid( table ) );

	}
	function ChangeSize( d ) {

		const size  = parseInt( getComputedStyle( $sudoku[ 0 ] ).getPropertyValue( '--cell_width' ) );
		$sudoku[ 0 ].style.setProperty( '--cell_width', `${ size + d }px` );

	}
	function insert( x, y, value ) {

		if ( !table[ x ][ y ].options.has( value ) ) {
			alert( 'Conflict' );
			return false;
		}
		rows[ x ].clear( value );
		cols[ y ].clear( value );
		blocks[ x / BLOCK_SIZE | 0 ][ y / BLOCK_SIZE | 0 ].clear( value );
		table[ x ][ y ].setValue( value );

	}



	/*==*==*==*==*==*==*==*==*
	 *       Handlers        *
	 *==*==*==*==*==*==*==*==*/

	function BuildSudoku() {

		const $sudoku = $( '<sudoku>' )
			.delegate( 'cell.main', 'click',   handleCellClick   )
			.delegate( 'cell.main', 'keydown', handleCellKeydown )
			.delegate( 'cell.main', 'paste',   handleCellPaste   )
			.appendTo( $wrap );
		$sudoku[ 0 ].style.setProperty( '--block_size', BLOCK_SIZE );

		return $sudoku;

	}
	function handleCellPaste( e ) {

		let str = e.originalEvent.clipboardData.getData( 'text' ).replace( /[\r\n]/g, '' );
		if ( str.length !== 81 ) alert( 'Bad import data' );
		else $sudoku.find( 'cell.main' ).each( function( i ) {
			if ( /[1-9]/.test( str[ i ] ) )
				$( this )
					.addClass( 'changed' )
					.html( str[ i ] );
		} );
		return false;

	}
	function handleCellClick( e ) {

		if ( !$wrap.is( '.edit' ) ) {
			edit();
			$( this ).focus();
		}

	}
	function handleCellKeydown( e ) {

		if ( [
			KEYCODES.SHIFT,
			KEYCODES.CTRL,
			KEYCODES.ALT,
		 ].includes( e.which ) ) return true;

		if ( e.ctrlKey && [
			KEYCODES.COPY,
			KEYCODES.PASTE,
		 ].includes( e.which ) ) return true;

		if ( KEYCODES.F1 <= e.which && e.which <= KEYCODES.F12 )
			return true;

		const $this = $( this );
		const index = $this.index();
		const SIZE2 = SIZE * SIZE;
		const isBig = BLOCK_SIZE > 3;
		let skip, digit;

		if ( KEYCODES.NUM0 <= e.which && e.which <= KEYCODES.NUM9 )
			digit = e.which - KEYCODES.NUM0;
		else if ( KEYCODES.NUMPAD0 <= e.which && e.which <= KEYCODES.NUMPAD9 )
			digit = e.which - KEYCODES.NUMPAD0;

		if ( isDigit( digit ) ) {
			$this
				[ cells[ index ].value !== digit? 'addClass': 'removeClass' ]( 'changed' )
				[ isBig? 'append' : 'html' ]( digit || '' );
			skip = !isBig;
		}

		switch ( e.which ) {

			case KEYCODES.ENTER:
				edit();
				return false;

			case KEYCODES.ESC:
				abortEdit();
				return false;

			case KEYCODES.DELETE:
				$this.empty();
				return false;

			case KEYCODES.BKSP:
				if ( isBig )
					$this.html( $this.html().slice( 0, -1 ) );
				else {
					$this.empty();
					skip = -1;
				}
				break;

			case KEYCODES.LEFT:
				skip = -1;
				break;

			case KEYCODES.RIGHT:
				skip = 1;
				break;

			case KEYCODES.UP:
				skip = -SIZE;
				break;

			case KEYCODES.DOWN:
				skip = SIZE;
				break;

			case KEYCODES.TAB:
			case KEYCODES.SPACE:
			case KEYCODES.NUM0:
				skip = e.shiftKey? -1: 1;
				break;

		}

		if ( skip )
			$sudoku.find( 'cell.main' )
				.eq( ( SIZE2 + index + skip ) % SIZE2 ).focus();
		else
			console.error( 'shit' );

		return false;

	}



	/*==*==*==*==*==*==*==*==*
	 *         Main          *
	 *==*==*==*==*==*==*==*==*/

	// constants
	const SIZE        = BLOCK_SIZE * BLOCK_SIZE;
	const BLOCK_RANGE = [ ...Array( BLOCK_SIZE ).keys() ];
	const RANGE       = [ ...Array( SIZE ).keys() ];
	const RANGEALL    = [ ...Array( SIZE * SIZE ).keys() ];
	const DIGITS      = RANGE.map( i => i + 1 );
	const KEYCODES    = {

		'BACKSPACE' : 8,
		'BKSP'      : 8,
		'DELETE'    : 46,
		'ESC'       : 27,
		'ESCAPE'    : 27,
		'SPACE'     : 32,

		'TAB'       : 9,
		'ENTER'     : 13,

		'SHIFT'     : 16,
		'CTRL'      : 17,
		'CONTROL'   : 17,
		'ALT'       : 18,

		'C'         : 67,
		'COPY'      : 67,
		'V'         : 86,
		'PASTE'     : 86,

		'PAGEUP'    : 33,
		'PAGEDOWN'  : 34,
		'END'       : 35,
		'HOME'      : 36,

		'F1'        : 112,
		'F12'       : 123,

		'LEFT'      : 37,
		'UP'        : 38,
		'RIGHT'     : 39,
		'DOWN'      : 40,

		'NUM0'      : 48,
		'NUM9'      : 57,
		'NUMPAD0'   : 96,
		'NUMPAD9'   : 105,

	};

	// DOM shit
	const $wrap       = $( ELM_SEL );
	const $sudoku     = BuildSudoku();
	const $panel      = BuildPanel();
	const dialog      = new Dialog();

	const table       = RANGE.map( i => RANGE.map( j => new Cell( i, j ) ) );
	const cells       = table.flat();
	const rows        = RANGE.map( i => new Row( i ) );
	const cols        = RANGE.map( i => new Column( i ) );
	const blocks      = BLOCK_RANGE.map(
		i => BLOCK_RANGE.map(
			j => new Block( i, j )
		)
	);

	render();


	/** API **/
	return {
		insert,
	};

}









