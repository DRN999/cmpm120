// Noriaki Nakano 
// nnakano@ucsc.edu 
// phaser assignment # 1 
// this program is my product of the phaser tutorial 

var game = new Phaser.Game(400, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update }); // init phaser 
var platforms; // platform obj 
var player; // player obj 
var cursors; // controls 
var stars; // stars obj 
var diamonds; // diamonds obj
var hitPlatform; // hitPlatform check 

var stars_number = 7; // number of stars in the level 
var stars_dist = 60; // the distance between the stars 

var diamonds_number = 1; // number of diamonds in the level

var scoreText; // score of the score of the player 
var scoreComplete; // shows if the player collected every item 
var score = 0; // score of the player 

var ledge_info = // information of the ledge in order of: x, y, width
[
	100, 50, 100, 
	200, 200, 100,
	0, 300, 50,
	310, 325, 50,
	100, 400, 100,
	50, 525, 50, 
	350, 550, 50
];


function preload()
{// preload assets

	console.log('preload'); // loads all files nessary for the level 
	game.load.image('sky', 'assets/img/sky.png');
	game.load.image('ground', 'assets/img/platform.png');
	game.load.image('star', 'assets/img/star.png');
	game.load.image('diamond', 'assets/img/diamond.png');
	game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);
	
}// End preload 



function create() 
{// place your assets
	
	console.log('create');
	
	//create scene 
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sky = game.add.sprite(0, 0, 'sky');
	sky.height = game.height;
	// init platform
    platforms = game.add.group();
    platforms.enableBody = true;
	
	//create ground 
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
	
	//create ledge 
    var ledge; 
	for(var i = 0; i < ledge_info.length / 3; i++)
	{ // create ledge objects per loop 
		ledge = platforms.create(ledge_info[i * 3], ledge_info[i * 3 + 1], 'ground');
		ledge.body.immovable = true;
		ledge.width = ledge_info[i * 3 + 2];
	}
	
	// create player 
	/* // if the player sprite is 'dude'
	player = game.add.sprite(32, game.world.height - 150, 'dude'); // set player 150px above the ground 
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300; // gravity of the player 
	player.body.collideWorldBounds = true; 
	player.animations.add('left', [0, 1, 2, 3], 10, true); // sets the animation sprites of the spritesheet 
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	*/ 
	
	// create player(baddie)
	player = game.add.sprite(32, game.world.height - 150, 'baddie'); // set player 150px above the ground 
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300; // gravity of the player 
	player.body.collideWorldBounds = true; 
	player.animations.add('left', [0, 1], 10, true); // sets the animation sprites of the spritesheet 
	player.animations.add('right', [2, 3], 10, true);
	player.frame = 1; // set initial direction to left 
	// init controls
	cursors = game.input.keyboard.createCursorKeys(); 
	
	// create stars
	stars = game.add.group(); 
	stars.points = 10; // set stars to equal 10 points 
	stars.enableBody = true;
	for (var i = 0; i < stars_number; i++)
    { // creates star objs to the number of stars_number 
        var star = stars.create(i * stars_dist, 0, 'star'); // create a star obj inside the stars group 
        star.body.gravity.y = 60; // gravity of the star 
        star.body.bounce.y = 0.7 + Math.random() * 0.2; // determines of the amount of bounce the obj has 
    }
	
	// create diamond 
	diamonds = game.add.group();
	diamonds.points = 25; // set diamonds to equal 25 points 
	diamonds.enableBody = true;
	var diamond = diamonds.create(Math.random() * (game.world.width - 100) , Math.random() * (game.world.height - 100), 'diamond');
	diamond.body.gravity.y = 60;
	diamond.body.bounce.y = 0.5;
	
	// create score text
	scoreText = game.add.text(16,16, 'score: ' + score, {fontSize: '22px', fill:'#000'});
	scoreComplete = game.add.text(260, 16, '', {fontSize: '22px', fill:'#000'});
}

function update() 
{// run game loop
	//console.log('update');
	hitPlatform = game.physics.arcade.collide(player, platforms); // check if the player obj and platform obj collide 
	
	game.physics.arcade.collide(stars, platforms); // checks if stars obj and platforms obj collide
	game.physics.arcade.overlap(player, stars, collect_obj, null, this); // calls collect_obj, if player and stars overlap 
	
	game.physics.arcade.collide(diamonds, platforms); // checks if stars obj and platforms obj collide 
	game.physics.arcade.overlap(player, diamonds, collect_obj, null, this); // calls collect_obj, if player and diamond overlap 
	player_input(); // control player input 
}

function collect_obj(player, obj)
{ // player collects objects 
	obj.kill();
	score += obj.parent.points; // get the point assignment from the parent object
	check_score();
} // End collect_obj

function check_score() 
{ // check if player collected all the objects 
	if(score == stars_number * stars.points + diamonds_number * diamonds.points)
		scoreComplete.text = 'COMPLETE';
	scoreText.text = 'score: ' + score;
} // End check_score 

var is_right;
function player_input()
{ // controls the player inputs 

    player.body.velocity.x = 0; // reset the velocity 

    if (cursors.left.isDown)
    {//  Move to the left
		is_right = 0;
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {//  Move to the right
		is_right = 1;
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {//  Stand still
        player.animations.stop();
		if(is_right)
			player.frame = 2;
		else
			player.frame = 1;
				
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {//  Allow the player to jump if they are touching the ground.
        player.body.velocity.y = -350;
    }
	
} // End player_input 

