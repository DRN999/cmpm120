README 
Noriaki Nakano 
nnakano@ucsc.edu 
1418185
Armada 

Files:
	html:
		index.html
	js:	
		main.js
		init.js
		Armada.js
		play_state.js 
		
		
assets credit:
	ship: https://opengameart.org/content/free-pirates-game-assets-by-unlucky-studio

Used addKey for keyinput instead of using game.input.keyboard.isDown(Phaser.Keyboard.R) in the update function 
because I didn't like how unresponsive it felt when holding the R key down. 

Can be replaced with the code that is commented out in the update function. 
