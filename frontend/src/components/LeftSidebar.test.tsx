import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LeftSidebar } from "./LeftSidebar";

describe("LeftSidebar", () => {
  it("invokes sidebar action callbacks", () => {
    const onOpenExtensions = vi.fn();
    const onExportMarkdown = vi.fn();
    const onSaveAs = vi.fn();
    const onImportFile = vi.fn();
    const onToggleAccount = vi.fn();
    const onToggleSettings = vi.fn();

    render(
      <LeftSidebar
        onOpenExtensions={onOpenExtensions}
        onExportMarkdown={onExportMarkdown}
        onSaveAs={onSaveAs}
        onImportFile={onImportFile}
        onToggleAccount={onToggleAccount}
        isAccountOpen={false}
        onToggleSettings={onToggleSettings}
        isSettingsOpen={false}
      />
    );

    fireEvent.click(screen.getByLabelText("Extensions Marketplace"));
    fireEvent.click(screen.getByLabelText("Export Markdown"));
    fireEvent.click(screen.getByLabelText("Save As"));
    fireEvent.click(screen.getByLabelText("Import File"));
    fireEvent.click(screen.getByLabelText("Account"));
    fireEvent.click(screen.getByLabelText("Settings"));

    expect(onOpenExtensions).toHaveBeenCalledTimes(1);
    expect(onExportMarkdown).toHaveBeenCalledTimes(1);
    expect(onSaveAs).toHaveBeenCalledTimes(1);
    expect(onImportFile).toHaveBeenCalledTimes(1);
    expect(onToggleAccount).toHaveBeenCalledTimes(1);
    expect(onToggleSettings).toHaveBeenCalledTimes(1);
  });
});
