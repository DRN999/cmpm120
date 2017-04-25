// main program, starts up phaser 

var game = new Phaser.Game(800, 800, Phaser.AUTO); // init phaser 

game.state.add('menu_state', menu_state);
game.state.add('play_state', play_state);
game.state.add('game_over', game_over);
game.state.start('menu_state'); // start game at menu 
