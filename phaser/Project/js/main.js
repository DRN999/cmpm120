// main program, starts up phaser 

window.onload = function() 
{
	game = new Phaser.Game(800, 800, Phaser.AUTO); // init phaser 
	game.state.add('play_state', play_state);
	game.state.start('play_state'); // start game at menu 
}