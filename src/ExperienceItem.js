import React from "react";

export default function ExperienceItem({
  company,
  location,
  title,
  period,
  description,
}) {
  return (
    <div className="experience-item">
      <p>
        <b>{company}</b>, {location} - <i>{title}</i>
      </p>

      <p style={{ fontSize: "12px" }}>{period}</p>

      <p>{description}</p>
    </div>
  );
}
