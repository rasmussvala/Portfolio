const ITEMS = [
  "C++",
  "React",
  "THREE.js",
  "Godot",
  "Blender",
  "Python",
  "Unity",
  "Firebase",
  "GLSL",
  "Node",
  "Mapbox",
  "Unreal Engine",
  "React Native",
  "p5.js",
];

export default function Marquee() {
  const row = (
    <div className="marquee__item" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item}
          <span className="sep"> * </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label="Technologies">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
