// The menu state, will contain more later on 
// for now the only function it was is to allow the player to press spacebar to continue

var menu_state = 
{ 
	
	preload: function()
	{// will be filled with images for the menu screen 
		
		
	}, // End preload 
	
	create: function()
	{ // create a system so that the if the player press SPACEBAR, then the game begins 
		console.log('loglog');
		game.add.text(16,16, 'Press SPACEBAR to start', {fontSize: '22px', fill:'#FFF'});
		var space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.addOnce(this.start, this);
	}, // End create 
	
	start: function() 
	{// changes the state
		game.state.start('play_state');
	}// End start 
	
};