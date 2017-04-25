// The menu state, will contain more later on 
// for now the only function it was is to allow the player to press spacebar to continue

var menu_state = 
{ 
	
	start_text: 0,
	alpha: 100,
	up: false, 
	select_sound: 0,
	
	preload: function()
	{// will be filled with images for the menu screen 
		util.load_image(images);
		game.load.audio('select', 'assets/audio/select09.mp3');
	}, // End preload 
	
	create: function()
	{ // create a system so that the if the player press SPACEBAR, then the game begins 
		
		space = game.add.sprite(0, 0, 'space');
		space.height = game.world.height;
		space.width = game.world.width;
		this.select_sound = game.add.audio('select');
		this.select_sound.volume = 0.2;
		
		game.add.text(160,250, 'Galaxy Runner', {fontSize: '70px', fill:'#FFF'});
		this.start_text = game.add.text(210,500, 'Press SPACEBAR to start', {fontSize: '30px', fill:'#FFF'});
		var space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.addOnce(this.start, this);
		
		var timer_animate = game.time.create(false);
		timer_animate.loop(1, this.animate, this);
		timer_animate.start();
	}, // End create 
	
	start: function() 
	{// changes the state
		this.select_sound.play();
		game.state.start('play_state');
	}, // End start 
	
	animate: function() 
	{// animate the opacity 
		this.start_text.alpha = this.alpha * 0.01;
		if(this.alpha == 100)
			this.up = false;
		else if(this.alpha == 0)
			this.up = true;
		if(this.up)
			this.alpha += 2;
		else
			this.alpha -= 2;
	}
	
};