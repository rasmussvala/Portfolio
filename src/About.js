export default function About() {
  return (
    <section className="about">
      <div className="about__heading">
        <h2>About me</h2>
        <span className="mono">RASMUS SVALA · LINKÖPING, SE</span>
      </div>

      <p className="about__body">
        I grew up in Tranås, Sweden, and now live in Linköping. I have a Master's degree in Media Technology 
        and Engineering from Linköping University. I write software for medical imaging at
        Sectra by day, and mess with games, web, and other small experiments by night.
      </p>

      <aside className="about__stats" aria-label="Stats">
        <div className="stat">
          <span className="stat__value">M.Sc.</span>
          <span className="stat__label">Media Tech. · LiU</span>
        </div>
        <div className="stat">
          <span className="stat__value">5+</span>
          <span className="stat__label">Years coding</span>
        </div>
      </aside>
    </section>
  );
}
