// Utilities of the game
// functions that are used to calculate and do other works etc.

var util = 
{// utilities 
	load_image: function(a_href) 
	{// loads the images from the array of links that the user inputs 
		for(var i = 0; i < a_href.length; i++)
		{
			var temp = a_href[i].split('/');
			temp = temp[temp.length - 1].split('.')[0];
			game.load.image(temp, a_href[i]);
		}
	},// End load_image 
	
	reset: function()
	{// resets all the global variables to reset the game state 
		score = 0; 
		level = 0;
	}, // End reset 
	
	rand_int: function(min, max)
	{// returns a random in between the min and max 
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}// End rand_int 
};



