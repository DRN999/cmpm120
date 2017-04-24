// The game over state, will contain more later on 
// for now the only function it was is to allow the player to press spacebar to continue

var game_over = 
{ 
	
	preload: function()
	{// will be filled with images for the menu screen 
		
		
	},
	
	create: function()
	{ // create a system so that the if the player press SPACEBAR, then the game begins 
		game.add.text(16,16, 'You are ded. Game over.', {fontSize: '22px', fill:'#FFF'});
		var press = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		press.onDown.addOnce(() => {
			util.reset();
			game.state.start('play_state');
		}, this);
	}
	
};