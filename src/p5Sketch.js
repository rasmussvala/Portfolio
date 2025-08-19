import p5 from "p5";

export default function sketch(p) {
  let letters = [];
  let lettersOriginalPositions = [];
  let asterisks = [];
  let customFont;
  let textSize = 120;
  let canvasHeight = 430;

  function getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }

  const primaryColor = getCSSVariable("--header-color");
  const textColor = getCSSVariable("--text-color");
  const backgroundColor = getCSSVariable("--background-color");

  p.preload = () => {
    customFont = p.loadFont("/Anton-Regular.ttf");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, canvasHeight);

    // Initial text size setting
    adjustTextSize();

    p.textFont(customFont);

    let message = "Rasmus Svala";
    createLettersAndAsterisks(message);
  };

  p.draw = () => {
    p.background(backgroundColor);

    for (let letter of letters) {
      letter.update();
      letter.display();
    }

    for (let asterisk of asterisks) {
      asterisk.update();
      asterisk.display();
    }
  };

  p.windowResized = () => {
    // Ensure that the canvas and textSize are available before proceeding
    if (p && p.canvas && typeof p.textSize === "function") {
      p.resizeCanvas(p.windowWidth, canvasHeight);
      adjustTextSize();
      createLettersAndAsterisks("Rasmus Svala");
    }
  };

  function adjustTextSize() {
    // Check if p.textSize is defined before using it
    if (p && typeof p.textSize === "function") {
      if (p.windowWidth < 900) {
        textSize = 60;
      } else {
        textSize = 120;
      }
      p.textSize(textSize);
    }
  }

  // Function to create and position letters and asterisks
  function createLettersAndAsterisks(message) {
    letters = [];
    lettersOriginalPositions = [];
    asterisks = [];

    let totalWidth = 0;
    for (let i = 0; i < message.length; i++) {
      totalWidth += p.textWidth(message.charAt(i));
    }

    let startX;
    let offsetX1;
    let offsetX2;
    let offsetY;
    if (p.windowWidth < 900) {
      // Align to left when window width is less than 900
      startX = 16;
      offsetX1 = 40;
      offsetX2 = 15;
      offsetY = 40;
    } else {
      // Center alignment for larger windows
      startX = (p.width - totalWidth) / 2;
      offsetX1 = 30;
      offsetX2 = 30;
      offsetY = 0;
    }

    let endX = startX + totalWidth;
    let x = startX;

    for (let i = 0; i < message.length; i++) {
      let letter = message.charAt(i);
      let w = p.textWidth(letter);

      letters.push(new MovableLetter(letter, x, p.height / 2));
      lettersOriginalPositions.push(p.createVector(x, p.height / 2));

      x += w;
    }

    asterisks.push(new SpinningAsterisk(startX - offsetX1, 210));
    asterisks.push(new SpinningAsterisk(endX + offsetX2, 100 + offsetY));
  }

  // Shared update logic for mouse repulsion and return-to-origin
  function updatePositionWithMouseRepulsion(position, getOriginalPosition) {
    let mousePosition = p.createVector(p.mouseX, p.mouseY);
    let direction = p5.Vector.sub(position, mousePosition);
    let distance = direction.mag();

    if (distance < 100) {
      direction.normalize();
      let force = p.map(distance, 0, 100, 10, 0);
      direction.mult(force);
      position.add(direction);
    } else {
      const originalPosition = getOriginalPosition();
      position.x = p.lerp(position.x, originalPosition.x, 0.1);
      position.y = p.lerp(position.y, originalPosition.y, 0.1);
    }
  }

  class SpinningAsterisk {
    constructor(x, y) {
      this.position = p.createVector(x, y);
      this.originalPosition = p.createVector(x, y);
      this.angle = 0;
    }

    update() {
      this.angle += 0.02;
      updatePositionWithMouseRepulsion(
        this.position,
        () => this.originalPosition
      );
    }

    display() {
      p.push();
      p.translate(this.position.x, this.position.y);
      p.rotate(this.angle);
      p.fill(textColor);
      p.textSize(50);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("*", 0, 0);
      p.pop();
    }
  }

  class MovableLetter {
    constructor(letter, x, y) {
      this.letter = letter;
      this.position = p.createVector(x, y);
    }

    update() {
      updatePositionWithMouseRepulsion(
        this.position,
        () => lettersOriginalPositions[letters.indexOf(this)]
      );
    }

    display() {
      p.fill(primaryColor);
      p.text(this.letter, this.position.x, this.position.y);
    }
  }
}
