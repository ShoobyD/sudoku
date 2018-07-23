
/*
 * polyfills
 */

if ( !Array.prototype.flat ) {

	Array.prototype.flat = function( search, start ) {

		return this.reduce((acc, val) => acc.concat(val), []);

	};

}


