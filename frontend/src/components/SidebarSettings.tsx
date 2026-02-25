import { ThemeSwitcher, type ThemeOption } from "./ThemeSwitcher";

type SidebarSettingsProps = {
  isOpen: boolean;
  theme: string;
  themeOptions: ThemeOption[];
  onThemeChange: (theme: string) => void;
};

export function SidebarSettings({ isOpen, theme, themeOptions, onThemeChange }: SidebarSettingsProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="sidebar-settings-popover" role="dialog" aria-label="Settings">
      <h3 className="sidebar-settings-title">Settings</h3>
      <ThemeSwitcher value={theme} options={themeOptions} onChange={onThemeChange} />
    </div>
  );
}
