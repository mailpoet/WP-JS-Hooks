function filter_a( str ) {
	return str + 'a';
}
function filter_b( str ) {
	return str + 'b';
}
function filter_c( str ) {
	return str + 'c';
}
function action_a( value ) {
	window.actionValue += 'a';
}
function action_b( value ) {
	window.actionValue += 'b';
}
function action_c( value ) {
	window.actionValue += 'c';
}
window.actionValue = '';

test( 'add and remove a filter', function() {
	expect(1);
	wp.hooks.addFilter( 'test.filter', filter_a );
	wp.hooks.removeFilter( 'test.filter' );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'test' );
} );

test( 'add a filter and run it', function() {
	expect(1);
	wp.hooks.addFilter( 'test.filter', filter_a );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'testa' );
	wp.hooks.removeFilter( 'test.filter' );
} );

test( 'add 2 filters in a row and run them', function() {
	expect(1);
	wp.hooks.addFilter( 'test.filter', filter_a );
	wp.hooks.addFilter( 'test.filter', filter_b );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'testab' );
	wp.hooks.removeFilter( 'test.filter' );
} );

test( 'add 3 filters with different priorities and run them', function() {
	expect(1);
	wp.hooks.addFilter( 'test.filter', filter_a );
	wp.hooks.addFilter( 'test.filter', filter_b, 2 );
	wp.hooks.addFilter( 'test.filter', filter_c, 8 );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'testbca' );
	wp.hooks.removeFilter( 'test.filter' );
} );

test( 'chain 3 filters with different priorities and then run them', function() {
	expect(1);
	wp.hooks
		.addFilter( 'test.filter', filter_a )
		.addFilter( 'test.filter', filter_b, 2 )
		.addFilter( 'test.filter', filter_c, 8 );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'testbca' );
	wp.hooks.removeFilter( 'test.filter' );
} );

test( 'add and remove an action', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks.addAction( 'test.action', action_a );
	wp.hooks.removeAction( 'test.action' );
	wp.hooks.doAction( 'test.action' );
	equal( window.actionValue, '' );
} );

test( 'add an action and run it', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks.addAction( 'test.action', action_a );
	wp.hooks.doAction( 'test.action' );
	equal( window.actionValue, 'a' );
	wp.hooks.removeAction( 'test.action' );
} );

test( 'add 2 actions in a row and then run them', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks.addAction( 'test.action', action_a );
	wp.hooks.addAction( 'test.action', action_b );
	wp.hooks.doAction( 'test.action' );
	equal( window.actionValue, 'ab' );
	wp.hooks.removeAction( 'test.action' );
} );

test( 'add 3 actions with different priorities and run them', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks.addAction( 'test.action', action_a );
	wp.hooks.addAction( 'test.action', action_b, 2 );
	wp.hooks.addAction( 'test.action', action_c, 8 );
	wp.hooks.doAction( 'test.action' );
	equal( window.actionValue, 'bca' );
	wp.hooks.removeAction( 'test.action' );
} );

test( 'chain 3 actions with different priorities and run them', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks
		.addAction( 'test.action', action_a )
		.addAction( 'test.action', action_b, 2 )
		.addAction( 'test.action', action_c, 8 )
		.doAction( 'test.action' );
	equal( window.actionValue, 'bca' );
	wp.hooks.removeAction( 'test.action' );
} );

test( 'pass in two arguments to an action', function() {
	var arg1 = 10,
		arg2 = 20;

	expect(4);

	wp.hooks.addAction( 'test.action', function( a, b ) {
		equal( arg1, a );
		equal( arg2, b );
	} );
	wp.hooks.doAction( 'test.action', arg1, arg2 );
	wp.hooks.removeAction( 'test.action' );

	equal( arg1, 10 );
	equal( arg2, 20 );
} );


test( 'call action with no hooks', function() {
	expect(1);

	ok( wp.hooks.doAction( 'test.noHooks' ) );
} );

test( 'fire action multiple times', function() {
	var func;
	expect(2);

	func = function() {
		ok( true );
	};

	wp.hooks.addAction( 'test.action', func );
	wp.hooks.doAction( 'test.action' );
	wp.hooks.doAction( 'test.action' );
	wp.hooks.removeAction( 'test.action' );
} );

test( 'fire action using method with context', function() {
	var obj;
	expect(1);

	obj = {
		foo: 10,
		method: function() {
			equal( this.foo, 10 );
		}
	};

	wp.hooks.addAction( 'test.action', obj.method, 10, obj );
	wp.hooks.doAction( 'test.action' );
	wp.hooks.removeAction( 'test.action' );

} );

test( 'remove specific action callback', function() {
	expect(1);
	window.actionValue = '';
	wp.hooks
		.addAction( 'test.action', action_a )
		.addAction( 'test.action', action_b, 2 )
		.addAction( 'test.action', action_c, 8 );

	wp.hooks.removeAction( 'test.action', action_b );
	wp.hooks.doAction( 'test.action' );
	equal( window.actionValue, 'ca' );
	wp.hooks.removeAction( 'test.action' );

} );

test( 'remove specific filter callback', function() {
	expect(1);
	wp.hooks.addFilter( 'test.filter', filter_a )
		.addFilter( 'test.filter', filter_b, 2 )
		.addFilter( 'test.filter', filter_c, 8 );

	wp.hooks.removeFilter( 'test.filter', filter_b );
	equal( wp.hooks.applyFilters( 'test.filter', 'test' ), 'testca' );
	wp.hooks.removeFilter( 'test.filter' );

} );
