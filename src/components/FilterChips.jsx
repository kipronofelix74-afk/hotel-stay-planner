export default function FilterChips({ options, value, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filters">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={value === opt.id ? 'chip chip-active' : 'chip'}
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
