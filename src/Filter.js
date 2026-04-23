export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "game", label: "Games" },
  { id: "web", label: "Web" },
  { id: "graphics", label: "Graphics" },
  { id: "3d", label: "3D" },
  { id: "ml", label: "ML" },
  { id: "package", label: "Packages" },
];

export default function Filter({ active, counts, onChange }) {
  return (
    <div className="filter" role="tablist" aria-label="Project categories">
      {CATEGORIES.map((c) => {
        const count = counts[c.id] ?? 0;
        if (c.id !== "all" && count === 0) return null;
        return (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            data-active={active === c.id}
            className="filter__pill"
            onClick={() => onChange(c.id)}
          >
            {c.label}
            <span className="filter__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
