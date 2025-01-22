let bottomImg, topImg;
let sweepingSound;

function preload() {
  bottomImg = loadImage('assets/okay.png', () => {
    console.log('bottomImg loaded successfully');
  }, err => {
    console.error('Error loading bottomImg:', err);
  });

  topImg = loadImage('assets/notOkay.png', () => {
    console.log('topImg loaded successfully');
  }, err => {
    console.error('Error loading topImg:', err);
  });

  sweepingSound = loadSound('assets/sweeping.mp3', () => {
    console.log('sweepingSound loaded successfully');
  }, err => {
    console.error('Error loading sweepingSound:', err);
  });
}

function setup() {
  let cnv = createCanvas(750, 400);
  cnv.position(0, 0);
  cnv.style('position', 'absolute');
  cnv.style('top', '50%');
  cnv.style('left', '50%');
  cnv.style('transform', 'translate(-50%, -50%)');
  cnv.style('z-index', '-1'); // Ensure the canvas is behind other elements

  // Add the fade-in class to the canvas
  cnv.addClass('fade-in');

  noCursor();
  cursor('assets/brush.png', 10, -5);

  if (topImg) {
    image(topImg, 0, 0); // Draw the black-and-white image once
  }
}

function draw() {
  // No need for any commands in draw() since the image is drawn in setup()
}

function mouseDragged() {
  if (bottomImg) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      copy(bottomImg, mouseX, mouseY, 20, 20, mouseX, mouseY, 20, 20);
      if (sweepingSound.isLoaded()) {
        sweepingSound.play();
      } else {
        console.error('sweepingSound is not loaded');
      }
    }
  }
}