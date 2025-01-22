

let cursorX = 0;
let cursorY = 0;
let imgElement; // Declare imgElement globally
let imgScale = 1; // Initial scale of the image
let cardSound;
let clickSound;

const phrases = [
  "Breathe deeply.",
  "Write gratitude list.",
  "Take a walk.",
  "Listen to music.",
  "Watch inspiring movies.",
  "Meditate for peace.",
  "Express gratitude daily.",
  "Declutter your space.",
  "Call a friend.",
  "Perform random kindness.",
  "Dance freely.",
  "Volunteer your time.",
  "Practice mindfulness.",
  "Cook something delicious.",
  "Try a new hobby.",
  "Watch funny videos.",
  "Do yoga stretches.",
  "Read or listen.",
  "Smile at photos.",
  "Write future letters.",
  "Pet animals.",
  "Plan a trip.",
  "Take a bath.",
  "Organize your thoughts.",
  "Use positive affirmations.",
  "Limit social media.",
  "Treat yourself.",
  "Speak kindly to yourself.",
  "Take a nap.",
  "Visit peaceful places.",
  "Practice art therapy.",
  "Meditate with apps.",
  "Try adventurous activities.",
  "Hang out with friends.",
  "Visit a museum.",
  "Set new goals.",
  "Celebrate achievements.",
  "Disconnect from devices.",
  "Start DIY projects.",
  "Listen to podcasts.",
  "Appreciate your surroundings.",
  "Spend time in silence.",
  "Do breathing exercises.",
  "Journal your thoughts.",
  "Relax your muscles.",
  "Create a vision board.",
  "Make a playlist.",
  "Repeat affirmations daily.",
  "Play a game.",
  "Exercise for endorphins.",
  "Celebrate small wins.",
  "Take a mental break.",
  "Try aromatherapy.",
  "Attend community events.",
  "Reflect on values.",
  "Follow a routine.",
  "Eat healthy meals.",
  "Solve puzzles.",
  "Use positive sticky notes.",
  "Compliment someone today."
];

const shouldNotDoPhrases = [
    "Overthink situations.",
    "Dwell on past mistakes.",
    "Compare yourself to others.",
    "Engage in negative self-talk.",
    "Isolate yourself.",
    "Overwork or stress.",
    "Hold grudges.",
    "Ignore your feelings.",
    "Procrastinate on tasks.",
    "Skip meals regularly.",
    "Overconsume unhealthy foods.",
    "Engage in toxic relationships.",
    "Avoid taking breaks.",
    "Neglect your sleep.",
    "Stay in negative environments.",
    "Focus on problems.",
    "Ignore self-care.",
    "Judge others harshly.",
    "Get stuck in routines.",
    "Keep your emotions bottled up.",
    "Fear failure.",
    "Push away support.",
    "Say yes to everything.",
    "Rush decisions.",
    "Ruminate on mistakes.",
    "Blame others constantly.",
    "Overindulge in media.",
    "Be excessively critical.",
    "Overcommit to tasks.",
    "Disregard personal boundaries.",
    "Keep toxic habits.",
    "Avoid confrontation.",
    "Hold onto negativity.",
    "Neglect your mental health.",
    "Suppress emotions.",
    "Overexamine your appearance.",
    "Take things personally.",
    "Engage in gossip.",
    "Neglect personal growth.",
    "Stagnate in comfort.",
    "Use distractions excessively.",
    "Compare achievements.",
    "Avoid responsibility.",
    "Ignore healthy habits.",
    "Lie to yourself.",
    "Focus on what’s lacking.",
    "Avoid new experiences.",
    "Get stuck in fear.",
    "Avoid challenges.",
    "Reject constructive criticism.",
    "Ignore your passions.",
    "Keep up with unhealthy trends.",
    "Withdraw from loved ones.",
    "Limit your potential.",
    "Resist change.",
    "Ignore your intuition.",
    "Let others control you.",
    "Engage in self-sabotage.",
    "Overanalyze interactions.",
    "Stay in toxic spaces."
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    cardSound = new Audio('assets/card.mp3');
    clickSound = new Audio('assets/click.mp3'); // Load the sound file
  });

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); // Create a canvas that covers the entire window
  cnv.position(0, 0); // Position the canvas at the top-left corner
  cnv.style('position', 'absolute'); // Ensure the canvas is positioned absolutely
  cnv.style('z-index', '-1'); // Ensure the canvas is behind other elements
  noCursor(); // Hide the default cursor

  // Add fade-in class to header and pressR elements
  select('.header').addClass('fade-in');
  select('.pressR').addClass('fade-in');
  select('.selection').addClass('fade-in');
  select('.selection-02').addClass('fade-in');
    select('.shouldDo').mousePressed(displayRandomPhrases);
    select('.shouldNotDo').mousePressed(displayRandomShouldNotDoPhrases);

// Add click event listener to shouldDo and shouldNotDo elements
    select('.shouldDo').mousePressed(() => {
        clickSound.play();
        displayRandomPhrases();
      });
      select('.shouldNotDo').mousePressed(() => {
        clickSound.play();
        displayRandomShouldNotDoPhrases();
      });
  }
  
function draw() {
  clear(); // Clear the canvas to redraw the custom cursor only
  cursorX = lerp(cursorX, mouseX, 0.1); // Smooth follow effect
  cursorY = lerp(cursorY, mouseY, 0.1);

  // Draw the custom cursor
  noStroke();
  fill(255, 255, 255); // White color
  ellipse(cursorX, cursorY, 40, 40); // Bigger circle for custom cursor

  // Add blur effect
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = 'white';
}

function keyPressed() {
    if (key === 'r' || key === 'R') { 
        cardSound.play(); // Play the sound when 'r' or 'R' is pressed
        // Remove the previous image if it exists
        if (imgElement) {
            imgElement.remove();
        }

        // Display a random image
        let randomIndex = floor(random(1, 31)); // Random number between 1 and 30
        let imgPath = `assets/${randomIndex}.png`; // Assuming images are named 1.png, 2.png, ..., 30.png
        imgElement = createImg(imgPath, 'Random Image');
        imgElement.parent('image-container'); // Assuming there is a container with id 'image-container' to hold the image

        // Center the image
        imgElement.style('position', 'absolute');
        imgElement.style('top', '50%');
        imgElement.style('left', '50%');
        imgElement.style('transform', 'translate(-50%, -50%)');
    }
}

function mouseWheel(event) {
    // Zoom in or out
    imgScale += event.deltaY * -0.001; // Adjust the scale factor as needed
    imgScale = constrain(imgScale, 0.5, 3); // Limit the scale between 0.5 and 3
  
    // Apply the scale to the image
    if (imgElement) {
      imgElement.style('transform', `translate(-50%, -50%) scale(${imgScale})`);
    }
  
    // Prevent default scrolling behavior
    return false;
  }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ensure the canvas resizes with the window
}


function displayRandomPhrases() {
    let shouldDoElement = select('.shouldDo');
    shouldDoElement.html('DO'); // Ensure "DO" is displayed
    let selectedPhrases = [];
    while (selectedPhrases.length < 3) {
      let phrase = random(phrases);
      if (!selectedPhrases.includes(phrase)) {
        selectedPhrases.push(phrase);
      }
    }
    selectedPhrases.forEach(phrase => {
      let p = createP(phrase);
      p.style('font-family', 'Figtree'); 
      p.style('font-size', '20px');
      p.style('text-align', 'left'); // Align text to the left
      p.style('position', 'relative'); // Set position to relative
      p.style('top', '50px'); // Move text 20px down
      p.style('left', '-90px'); // Move text 95px to the left
      p.parent(shouldDoElement);
    });
    shouldDoElement.show(); // Ensure the element is visible
}

function displayRandomShouldNotDoPhrases() {
    let shouldNotDoElement = select('.shouldNotDo');
    shouldNotDoElement.html('DON\'T'); // Ensure "DON'T" is displayed
    let selectedPhrases = [];
    while (selectedPhrases.length < 3) {
      let phrase = random(shouldNotDoPhrases);
      if (!selectedPhrases.includes(phrase)) {
        selectedPhrases.push(phrase);
      }
    }
    selectedPhrases.forEach(phrase => {
      let p = createP(phrase);
      p.style('font-family', 'Figtree'); 
      p.style('font-size', '20px');
      p.style('text-align', 'left'); // Align text to the left
      p.style('position', 'relative'); // Set position to relative
      p.style('top', '50px'); // Move text 20px down
      p.style('left', '-30px'); // Move text 95px to the left
      p.parent(shouldNotDoElement);
    });
    shouldNotDoElement.show(); // Ensure the element is visible
}