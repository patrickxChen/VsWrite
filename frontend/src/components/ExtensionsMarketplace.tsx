type ExtensionsMarketplaceProps = {
  isOpen: boolean;
  onClose: () => void;
  petsInstalled: boolean;
  petsEnabled: boolean;
  onInstallPets: () => void;
  onTogglePets: () => void;
  onUninstallPets: () => void;
};

export function ExtensionsMarketplace({
  isOpen,
  onClose,
  petsInstalled,
  petsEnabled,
  onInstallPets,
  onTogglePets,
  onUninstallPets
}: ExtensionsMarketplaceProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="extensions-backdrop" role="dialog" aria-modal="true" aria-label="Extensions Marketplace">
      <aside className="extensions-panel">
        <div className="extensions-header">
          <h2>Extensions Marketplace</h2>
          <button className="extensions-close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="extensions-search-wrap">
          <input value="pets" readOnly className="extensions-search" aria-label="Search extensions" />
        </div>

        <article className="extension-card">
          <div className="extension-icon">🐾</div>
          <div className="extension-content">
            <h3>Screen Pets</h3>
            <p className="extension-publisher">VsWrite Labs</p>
            <p className="extension-description">Adds tiny animated pets that roam your writing screen.</p>
            <div className="extension-actions">
              {!petsInstalled ? (
                <button className="extension-btn extension-btn-primary" onClick={onInstallPets}>
                  Install
                </button>
              ) : (
                <>
                  <button className="extension-btn" onClick={onTogglePets}>
                    {petsEnabled ? "Disable" : "Enable"}
                  </button>
                  <button className="extension-btn extension-btn-danger" onClick={onUninstallPets}>
                    Uninstall
                  </button>
                </>
              )}
            </div>
          </div>
        </article>
      </aside>
    </div>
  );
}
