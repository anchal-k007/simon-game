
var colourArray = ["red","blue","green","yellow"];        //Colour of buttons
var gameSequence = [];           //Stores the sequence that needs to be followed
var userSequence = [];           //Stores the sequence that was clicked by the user
var level = 0;

// Generate a random number and select a colour based on the random number
function generateRanomNumber() {
  var randomNumber = Math.floor(4*(Math.random()));       //There are 4 colours: 0-3 
  return randomNumber;
}

//Play audio correspnding to the button pressed
function playAudio(buttonPressed) {
  var audio = new Audio("sounds/" + buttonPressed + ".mp3");
  audio.play();
}

// Press button by adding the pressed class and removing it after a timeout
function animateButton(selectedButton) {
  $("."+selectedButton).addClass("pressed");
  setTimeout(function() {
    $("."+selectedButton).removeClass("pressed");
  }, 200);
} 

function checkButton() {
  return (userSequence[userSequence.length-1] === gameSequence[userSequence.length-1]);   
}


function gameOver() {
  //Reset all variables;
  level = 0;        
  gameSequence = [];
  userSequence = [];

  $("body").css("background-color","red");
  setTimeout( function() {
    $("body").css("background-color","#9f38ff");
  }, 100);
  playAudio("wrong");
  $(".small-title").text("Wrong! Press any key to play again");
}

// Choose the next colour to add to the gameSequence
function nextSequence() {

  //Generate a random number in range [0,3]
  var num = generateRanomNumber();

  //Add a new colour to the gameSequence
  gameSequence.push(colourArray[num]);      
  
  //Play the audio and animate the button which has been added into the sequence
  playAudio(colourArray[num]);
  animateButton(colourArray[num]);

  userSequence = [];      //Empty the user sequence
  level++;        //Increase the level of the game
  $(".small-title").text("Level " + level);     //Show the level
}

// Add event listeners to buttons to record the pattern clicked by user and check if it is the same as game sequence
$(".box").click( function(event) {

  //Animate the button that has been clicked
  animateButton(event.target.id);

  //Add the button clicked to the user sequence
  userSequence.push(event.target.id);    //target gives the html element on which the click happened
  
  //Check if the correct button has been pressed or not
  var correctButtonPressed = checkButton();

  //Game over if incorrect button has been pressed
  if(!correctButtonPressed) {
    gameOver();
  }

  //If the correct button has been pressed, then play its corresponding audio
  else {
    playAudio(event.target.id);
  }

  //When the level has been cleared, i.e., all the sequence of buttons have been pressed correctly, add a new button to the sequence
  if(userSequence.length === gameSequence.length && level !== 0) {
    setTimeout(nextSequence, 750);
  }
});


// Start game when a keyboard event is detected
$(document).keyup(function() {
  if(level === 0) {       //If the game has not been started yet, then start it by calling the next sequence
    nextSequence();
  }
});
