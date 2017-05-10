// play state of the game 

var play_state = 
{// the main play mode 
	
	preload: function()
	{// preload assets
		
		var name = images[0].split('.')[0].split('/');
		game.load.image(name[name.length - 1], images[0]);
		
		
	},// End preload 
	
	create: function()
	{// create play_state
		
		console.log('create');
		
		player = new Player(game, 'Square', 0, 512, 375, 750, 0.1); // 512 is the size of the image 
		enemy = new Enemy(game, 'Square', 0, 512, 375, 200, 0.1); // 512 is the size of the image 
		game.add.existing(player); // add the new armada to the game 
		game.add.existing(enemy); // add the new armada to the game 
		
	},// End create 

	update: function()
	{
		if(player.body.y < -50)
		{
			player.body.y = 750;
			player.body.x = 375;
		}
		game.physics.arcade.overlap(player, enemy, this.player_hit , null, this);

		//game.physics.arcade.overlap(player, enemy.children[0], this.player_hit , null, this);
		
	},
	
	player_hit: function()
	{
		console.log('col');
		
	}
	
	
};
