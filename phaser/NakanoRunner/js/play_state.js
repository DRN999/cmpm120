// play state of the game 

var play_state = 
{// the main play mode 
	
	preload: function()
	{// preload assets
		
		util.load_image(images);
		game.load.spritesheet('redfighter', 'assets/img/redfighter_sprite.png', 343, 383);
		game.load.spritesheet('part', 'assets/img/part.png', 17,17);
		game.load.spritesheet('ophanim_sprite', 'assets/img/ophanim_sprite.png', 167, 114 );
		game.load.audio('music_1', 'assets/audio/game_maoudamashii_7_rock51.ogg');
		game.load.audio('boost_sound', 'assets/audio/honoohonoonotama.wav');
		game.load.audio('shoot_sound', 'assets/audio/shagekishot.wav');
		game.load.audio('hit_sound', 'assets/audio/small_explosion1.mp3');
		game.load.audio('player_hit_sound', 'assets/audio/shoot1.mp3');
		
	},// End preload 
	
	create: function()
	{// create play_state
		
		//music init 
		music_1 = game.add.audio('music_1');
		music_1.volume = 0.1;
		music_1.loop = true;
		music_1.addMarker('restart', 0.3, 54, 0.1, true);
		music_1.play('restart', 0, 0.1, true, true);
		
		// boost sound init 
		boost_sound = game.add.audio('boost_sound');
		boost_sound.volume = 0.08;
		shoot_sound = game.add.audio('shoot_sound');
		shoot_sound.volume = 0.03;
		
		// hit sound init 
		hit_sound = game.add.audio('hit_sound');
		hit_sound.volume = 0.2;
		hit_sound.addMarker('start', 0.1, 2, 0.1, false);
		
		// player hit sound init 
		player_hit_sound = game.add.audio('player_hit_sound');
		player_hit_sound.volume = 0.2;
		
		//create scene 
		game.physics.startSystem(Phaser.Physics.P2JS);
		space = game.add.sprite(0, 0, 'space');
		space.height = game.world.height;
		space.width = game.world.width;
		
		// init particle emitter for the space look 
		var emitter = game.add.emitter(game.world.centerX, 0, 400);
		emitter.width = game.world.width;
		emitter.makeParticles('part');
		emitter.forEach((p)=>{p.tint = 0xEEEEEE;});
		emitter.maxParticles = 25;
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(300, 500);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.start(false, 1600, 5, 0);
		
		// init shooting group 
		shots = game.add.group();
		shots.enableBody = true;
		shots.damage = 10;
		game.physics.arcade.enable(shots);
		
		// init enemy group 
		enemies = game.add.group();
		enemies.enableBody = true;
		
		// timer for general gameplay 
		timer_skirmish = game.time.create(false);
		timer_skirmish.loop(2000, this.skirmish, this);
		timer_skirmish.start();
		
		// timer for the shooting mechanic 
		timer_shoot = game.time.create(false);
		timer_shoot.loop(100, this.shoot, this);
		
		// timer for when the player gets damaged 
		timer_damaged = game.time.create(false);
		timer_damaged.loop(1000, this.stop_damaged, this);
		
		// create player
		player = game.add.sprite(350, game.world.height - 250, 'redfighter', 4); // set player 150px above the ground 
		player.scale.setTo(0.2, 0.2);
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 0; // gravity of the player 
		player.body.collideWorldBounds = true; 
		player.move_right = false;
		player.move_left = false;
		player.move_up = false;
		player.move_down = false;
		player.boost = false;
		player.velocity = 350;
		player.boost_velocity = 1000;
		player.health = 100;
		player.damaged = false;
		
		//player animation 
		var left = player.animations.add('left', [3, 2, 1, 0], 20, true); // sets the animation sprites of the spritesheet 
		left.onLoop.add(this.animation_stop, this);
		left.loop = false;
		var right = player.animations.add('right', [5, 6, 7, 8], 20, true);
		right.onLoop.add(this.animation_stop, this);
		right.loop = false;
		var hit_damage = player.animations.add('damaged', [4, 9, 4, 9], 50, true);
		hit_damage.loop = true;
		
		// init keyinput 
		// shooting input 
		var shooting = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		shooting.onDown.add(() => { 

			this.shoot();
			timer_shoot.start();
			shoot_start = true;
			
		}, this);
		shooting.onUp.add(() => { timer_shoot.stop(false);}, this);
		
		// boost input 
		var boosting = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		boosting.onDown.add(() => { 
			player.boost = true;
			boost_sound.play();
		}, this);
		boosting.onUp.add(() => {
			player.boost = false;
			
		}, this);
		
		// w,up input 
		var w_press = game.input.keyboard.addKey(Phaser.Keyboard.W);
		w_press.onDown.add(() => {
			player.move_up = true;
		}, this);
		w_press.onUp.add(() => {
			player.move_up = false;
		}, this);
		
		// a,left input 
		var a_press = game.input.keyboard.addKey(Phaser.Keyboard.A);
		a_press.onDown.add(() => {
			player.move_left = true;
			if(!player.damaged)
				player.animations.play('left');
		}, this);
		a_press.onUp.add(() => {
			player.move_left = false;
		}, this);
		
		// s,down input 
		var s_press = game.input.keyboard.addKey(Phaser.Keyboard.S);
		s_press.onDown.add(() => {
			player.move_down = true;
		}, this);
		s_press.onUp.add(() => {
			player.move_down = false;
		}, this);
		
		// d,right input  
		var d_press = game.input.keyboard.addKey(Phaser.Keyboard.D);
		d_press.onDown.add(() => {
			player.move_right = true;
			if(!player.damaged)
				player.animations.play('right');
		}, this);
		d_press.onUp.add(() => {
			player.move_right = false;
		}, this);
		
		// create player data text
		scoreText = game.add.text(16,16, 'score: ' + score, {fontSize: '22px', fill:'#FFF'});
		livesText = game.add.text(16, 40, 'health: ', {fontSize: '22px', fill:'#FFF'});
		
		// create health bar 
		graphics = game.add.graphics(0, 0);
		graphics.lineStyle(0);
		graphics.beginFill(0xFF00FF, 1);
		graphics.drawRect(90, 45, 200, 16);
		graphics.endFill();
		
	},// End create 
	
	update: function() 
	{// run game loop
		
		// update the score 
		score++;
		
		// update sprite movement 
		this.move_player();
		this.move_shots();
		this.move_enemies();
		
		scoreText.setText('score: ' + score); // increase the score by time 
		
		//redraw the rectangle that shows the player health 
		graphics.clear();
		graphics = game.add.graphics(0, 0);
		graphics.lineStyle(0);
		graphics.beginFill(player.health >= 30 ? 0x00FF00 : 0xFF0000, 1); // turns the rect to red when health is low 
		graphics.drawRect(90, 45, player.health * 2, 16);
		graphics.endFill();
		
		// detect collision of objects 
		game.physics.arcade.overlap(shots, enemies, this.attack_enemy, null, this); 
		game.physics.arcade.overlap(player, enemies, this.player_hit , null, this);
		
	}, // End update 
	
	player_hit: function(play, enem)
	{// when the player gets hit by an enemy 
		if(!player.damaged)
		{
			player.health -= enem.damage;
			if(player.health <= 0)
			{
				music_1.stop();
				game.state.start('game_over');
			}
			player.damaged = true;
			player.animations.play('damaged');
			player_hit_sound.play();
			timer_damaged.start();
		}
	}, // End player_hit 
	
	stop_damaged: function() 
	{// timer function 
		player.damaged = false;
		timer_damaged.stop(false);
		player.animations.stop(null, true);
	},
	
	
	collect_obj: function(player, obj)
	{ // player collects objects 
		obj.kill();
		score += obj.parent.points; // get the point assignment from the parent object
		
	}, // End collect_obj
	
	attack_enemy: function(shot, enemy)
	{// damages enemy when fire hits 
		
		score += 5;
		hit_sound.play('start', 0, 0.1, false, true);
		if(!enemy.damaged)
		{
			enemy.animations.play('hit');
		}
		enemy.health -= shot.parent.damage;
		if(enemy.health <= 0)
		{
			score += enemy.points;
			enemy.kill();
		}
		shot.kill();
		
	}, // End attack_enemy 
	
	animation_stop: function(sprite, animation)
	{// stop loop animation 
		player.animations.stop(null, true);
		
	}, // End animation_stop
	
	move_shots: function()
	{// moves the shots fired by the ship 
		shots.forEach((shot) => {
			try 
			{
				shot.body.y -= 30;
				if (shot.body.y < -20)
				{
					shots.remove(shot, true);
				}
			}
			catch (e)
			{
				console.log(shot);
			}
		});
	}, // End move_shot
	
	skirmish: function()
	{// timer function that takes cares of normal enemy spawn 
		var num = util.rand_int(1, 3);
		for(var i = 0; i < num; i++)
		{
			var pat = util.rand_int(0,2); 
			this.spawn_ophanim
			(// create a random ophanim 
				pat, // pattern 
				pat ? util.rand_int(200, 600) : util.rand_int(0, 750), // opha_x
				-10, // opha_y
				util.rand_int(300, 500), //origin_x
				0,  // origin_y
				util.rand_int(2, 5), // speed 
				util.rand_int(2, 5), // orbit_speed
				util.rand_int(0, 1) ? 1 : -1// down direction
			);
		}
	}, // End skirmish 
	
	shoot: function()
	{// timer function for shooting 
		shots.create(player.body.x + 26, player.body.y + 10, 'part');
		shoot_sound.play();
	}, /// End shoot 
	
	move_player: function()
	{// update function for player movement 
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		var vel =  player.boost ? player.boost_velocity : player.velocity;
		if(player.move_right)
		{
			player.body.velocity.x += vel
		}		
		
		if(player.move_left)
		{
			player.body.velocity.x += vel * -1;
		}
		
		if(player.move_up)
		{
			player.body.velocity.y += vel * -1;
		}
	
		if(player.move_down)
		{
			player.body.velocity.y += vel;
		}
		
		if(!(player.move_right || player.move_left || player.move_up || player.move_down) && !player.damaged)
		{
			player.animations.frame = 4;
		}
	}, // End move_player 
	
	spawn_ophanim: function(p, opha_x, opha_y, o_x, o_y, spd, o_spd, dwn_dir)
	{// spawn an ophanim with the parameter 
		var opha = enemies.create(opha_x, opha_y, 'ophanim_sprite')
		var hit = opha.animations.add('hit', [1, 0, 1, 0], 30, true);
		hit.onComplete.add((sprite, animation) => {
			sprite.damaged = false;
		}, this);
		hit.loop = false;
		opha.type_mode = {
			pattern: p, 
			oribit: false, 
			turn: false, 
			orig_x: o_x,
			orig_y: o_y,
			speed: spd, 
			orbit_speed: o_spd,
			down_direction: dwn_dir,
			theta: 0, 
			rad: 0,
		};
		opha.type = 0;
		opha.damaged = false;
		opha.damage = 30;
		opha.health = 50;
		opha.points = 500;
		opha.scale.setTo(0.5, 0.5);
	}, // End spawn_ophanim 
	
	move_enemies: function()
	{// update functions for enemy movements 
		try
		{// try for each enemy type 
			enemies.forEach((enem) => { 
				switch(enem.type)
				{
					case 0: this.move_ophanim(enem); break;
				}
				
			});	
		}catch(e)
		{
			console.log('error');
		}
	},// End move_ophanims 
	
	move_ophanim: function(opha)
	{// update function for moving ophanims 
		var pat = opha.type_mode.pattern;
		switch(pat)
		{// differentiate the different movement pattern of each ophanims 
		
			case 0: // pattern 0: goes straight down 
				opha.body.y += opha.type_mode.speed;
				if(opha.body.y > game.world.height)
					opha.kill();
			break;
						
			case 1: // pattern 1: circles down 
				if(opha.body.y < opha.type_mode.orig_y && !opha.type_mode.orbit)
				{// falls down until it reachs the y coordinate of the orbit origin 
					opha.body.y += opha.type_mode.speed;
					if(opha.body.y >= opha.type_mode.orig_y)
					{
						opha.body.y = opha.type_mode.orig_y;
						opha.type_mode.rad = opha.body.x - opha.type_mode.orig_x;
						opha.type_mode.orbit = true;
					}
				}
				else
				{// orbits the origin as the origin goes down 
					opha.body.x = (opha.type_mode.rad * Math.cos(opha.type_mode.theta / 180 * Math.PI) + opha.type_mode.orig_x);
					opha.body.y = (opha.type_mode.rad * Math.sin(opha.type_mode.theta / 180 * Math.PI) + opha.type_mode.orig_y);
					opha.type_mode.theta -= opha.type_mode.orbit_speed;
					opha.type_mode.orig_y += opha.type_mode.speed;
				}
				if(opha.body.y - Math.abs(opha.type_mode.rad) > game.world.height)
					opha.kill();
			break;

			case 2: // pattern 2: goes down until it reaches the bottom, then moves along the wall 
				if(opha.body.y < game.world.height - opha.body.height && !opha.type_mode.turn)
					opha.body.y += opha.type_mode.speed;
				else if(opha.type_mode.turn && (opha.body.x <= 0 || opha.body.x >= game.world.width - opha.body.width))
				{
					opha.body.y -= opha.type_mode.speed;
				}
				else if(opha.body.y >= game.world.height - opha.body.height)
				{
					opha.type_mode.turn = true;
					opha.body.x += opha.type_mode.speed * opha.type_mode.down_direction;
				}		
				if(opha.type_mode.turn && opha.body.y < 0 - opha.height)
					opha.kill(); 		
			break;
			
		}// End switch	
	}, // End move_ophanim 
	
};
