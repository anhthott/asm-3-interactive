let frame, selection, selection02, header, mainpage;
let cursorX = 0;
let cursorY = 0;
let clickSound;

document.addEventListener('DOMContentLoaded', () => {
  clickSound = new Audio('assets/click.mp3'); // Load the click sound file
});

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); // Create a canvas that covers the entire window
  cnv.position(0, 0); // Position the canvas at the top-left corner
  cnv.style('position', 'absolute'); // Ensure the canvas is positioned absolutely
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '-1'); // Ensure the canvas is behind other elements

  // Select the elements using p5.js DOM functions
  frame = select('.frame');
  selection = select('.selection');
  selection02 = select('.selection-02');
  header = select('.header');
  mainpage = select('.mainpage');

  // Initially hide selection elements
  selection.style('display', 'none');
  selection02.style('display', 'none');

   // Add mousePressed event to the frame
   frame.mousePressed(() => {
    clickSound.play(); // Play the click sound
    showSelections();
  });
  
  // Add the fade-in class to elements after a short delay
  setTimeout(() => {
    header.addClass('fade-in');
    mainpage.addClass('fade-in');
    frame.addClass('fade-in');
    select('#background-video').addClass('fade-in');
  }, 100); // Delay to ensure the page has loaded

  // Hide the default cursor
  noCursor(); // p5.js function to hide the cursor
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

function showSelections() {
  // Show the hidden selection elements when frame is clicked
  selection.style('display', 'flex');
  selection02.style('display', 'flex');

  // Optionally add a fade-in effect to the newly shown elements
  selection.addClass('fade-in');
  selection02.addClass('fade-in');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ensure the canvas resizes with the window
}