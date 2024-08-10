import p5 from "p5";

export default function sketch(p) {
  let letters = [];
  let originalPositions = [];
  let letterSpacing = 0;
  let customFont;

  p.preload = () => {
    customFont = p.loadFont("/Anton-Regular.ttf");
  };

  p.setup = () => {
    p.createCanvas(800, 200);
    p.textSize(120);
    p.textFont(customFont);

    let message = "Rasmus Svala";
    let x = 100;

    for (let i = 0; i < message.length; i++) {
      let letter = message.charAt(i);
      let w = p.textWidth(letter);

      letters.push(new MovableLetter(letter, x, p.height / 2));
      originalPositions.push(p.createVector(x, p.height / 2));

      x += w + letterSpacing;
    }
  };

  p.draw = () => {
    p.background("#fffbf4");

    for (let i = 0; i < letters.length; i++) {
      letters[i].update();
      letters[i].display();
    }
  };

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
