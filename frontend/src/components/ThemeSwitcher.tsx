export type ThemeOption = {
  id: string;
  label: string;
};

type ThemeSwitcherProps = {
  value: string;
  options: ThemeOption[];
  onChange: (theme: string) => void;
};

export function ThemeSwitcher({ value, options, onChange }: ThemeSwitcherProps) {
  return (
    <label className="theme-switcher">
      Theme
      <select value={value} onChange={(event) => onChange(event.target.value)} className="theme-select">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
