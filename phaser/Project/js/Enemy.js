
function Enemy(game, key, frame, size, p_x, p_y, scale)
{// Enemy Constructor 

	
	Phaser.Sprite.call(this, game, p_x, p_y, key, frame);
	
	this.scale.x = scale // set the scales 
	this.scale.y = scale; 
	
	this.anchor.setTo(0.5, 0.5);
	
	this.turning = true;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	
	this.timer_rotate = game.time.create(false);
	this.timer_rotate.loop(1000, () => {
		this.turning = true;
		this.timer_rotate.pause();
		
	}, this);
	this.timer_rotate.start();
	this.timer_rotate.pause();
	
	var graphics = game.add.graphics();
	graphics.boundsPadding = 0;
	graphics.beginFill(0xFFFFFF);
	graphics.lineStyle(10, 0xFFFFFF, 1)
	graphics.lineTo(-500, 1000);
	graphics.lineTo(500, 1000);
	graphics.lineTo(0, 0);
	graphics.endFill();
	
	game.physics.enable(graphics, Phaser.Physics.ARCADE);
	this.addChild(graphics);
	
	console.log(this);
	//window.graphics = graphics;
	
}// End Enemy constructor 

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{// update, change direction when the ship reaches the end of the screen 
	
	if(this.turning)
	{	
		this.angle += 1;
		this.angle = parseInt(this.angle);
	}
	
	if(this.angle % 90 == 0)
	{
		this.turning = false;
		this.timer_rotate.resume();
	}
	
	
}// End update 

