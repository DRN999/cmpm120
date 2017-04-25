// Noriaki Nakano 
// nnakano@ucsc.edu 
// init variables 

var player; // player obj 

var scoreText; // the text for each of the data that it corresponds to it 
var livesText; 
var levelText;
var barrierText;

// sprite groups 
var shots;
var enemies;

// sound files 
var music_1;
var boost_sound;
var shoot_sound;
var hit_sound;
var player_hit_sound;
var graphics;

var score = 0; // data of the player 
var level = 0;

// timers 
var timer_skirmish;
var timer_shoot;
var timer_damaged;

var images = // images that needs to be imported 
[
	'assets/img/space.jpg'
];
