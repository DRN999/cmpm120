// Noriaki Nakano 
// nnakano@ucsc.edu 
// init variables 

var platforms; // platform obj 
var player; // player obj 
var cursors; // controls 
var stars; // stars obj 
var diamonds; // diamonds obj
var hitPlatform; // hitPlatform check 
var is_right = 3;
var is_up = 3;

var stars_number = 7; // number of stars in the level 
var stars_dist = 60; // the distance between the stars 

var diamonds_number = 1; // number of diamonds in the level

var scoreText; // the text for each of the data that it corresponds to it 
var livesText; 
var levelText;
var barrierText;
var shootText;
var boostext;

var shots;
var enemies;

var music_1;
var music_kappa;
var boost_sound;
var shoot_sound;
var hit_sound;

var score = 0; // data of the player 
var level = 0;


var timer_skirmish;
var timer_shoot;
var timer_damaged;



var images = // images that needs to be imported 
[
	'assets/img/space.jpg',
	'assets/img/star.png',
	'assets/img/diamond.png',
	'assets/img/ophanim.png'
];

var enemy_stack = new Array();

var key_input = { empty: true }; // variable that will hold all key inputs for the play scene 
