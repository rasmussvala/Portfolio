import p5 from "p5";

export default function sketch(p) {
  let letters = [];
  let asterisks = [];
  let originalPositions = [];
  let letterSpacing = 0;
  let customFont;

  p.preload = () => {
    customFont = p.loadFont("/Anton-Regular.ttf");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, 400);
    p.textSize(120);
    p.textFont(customFont);

    let message = "Rasmus Svala";

    // Calculate total width of the message
    let totalWidth = 0;
    for (let i = 0; i < message.length; i++) {
      totalWidth += p.textWidth(message.charAt(i)) + letterSpacing;
    }
    totalWidth -= letterSpacing; // Remove extra spacing after last letter

    // Calculate starting x-position to center the message
    let startX = (p.width - totalWidth) / 2;
    let x = startX;

    for (let i = 0; i < message.length; i++) {
      let letter = message.charAt(i);
      let w = p.textWidth(letter);

      letters.push(new MovableLetter(letter, x, p.height / 2));
      originalPositions.push(p.createVector(x, p.height / 2));

      x += w + letterSpacing;
    }

    // Adjust asterisk positions
    asterisks.push(new SpinningAsterisk(p.width * 0.23, 210));
    asterisks.push(new SpinningAsterisk(p.width * 0.76, 100));
  };

  p.draw = () => {
    p.background("#fffbf4");

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
    p.resizeCanvas(p.windowWidth, 400);
    // Optionally re-calculate positions if needed
  };

  class SpinningAsterisk {
    constructor(x, y) {
      this.position = p.createVector(x, y);
      this.originalPosition = p.createVector(x, y);
      this.angle = 0;
    }

    update() {
      // Update rotation
      this.angle += 0.02; // Rotation speed

      // Update position based on mouse proximity
      let mousePos = p.createVector(p.mouseX, p.mouseY);
      let dir = p5.Vector.sub(this.position, mousePos);
      let d = dir.mag();

      if (d < 100) {
        dir.normalize();
        let force = p.map(d, 0, 100, 10, 0);
        dir.mult(force);
        this.position.add(dir);
      } else {
        // Return to original position
        this.position.x = p.lerp(this.position.x, this.originalPosition.x, 0.1);
        this.position.y = p.lerp(this.position.y, this.originalPosition.y, 0.1);
      }
    }

    display() {
      p.push();
      p.translate(this.position.x, this.position.y);
      p.rotate(this.angle);
      p.fill("#000000"); // Color of the asterisk
      p.textSize(50);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("*", 0, 0); // Draw asterisk centered at (0, 0)
      p.pop();
    }
  }

  class MovableLetter {
    constructor(letter, x, y) {
      this.letter = letter;
      this.position = p.createVector(x, y);
    }

    update() {
      let mousePos = p.createVector(p.mouseX, p.mouseY);
      let dir = p5.Vector.sub(this.position, mousePos);
      let d = dir.mag();

      if (d < 100) {
        dir.normalize();
        let force = p.map(d, 0, 100, 10, 0);
        dir.mult(force);
        this.position.add(dir);
      } else {
        let originalPos = originalPositions[letters.indexOf(this)];
        this.position.x = p.lerp(this.position.x, originalPos.x, 0.1);
        this.position.y = p.lerp(this.position.y, originalPos.y, 0.1);
      }
    }

    display() {
      p.fill("#fa4411");
      p.text(this.letter, this.position.x, this.position.y);
    }
  }
}
