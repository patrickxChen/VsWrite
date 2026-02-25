export function PetOverlay() {
  return (
    <div className="pet-overlay" aria-hidden="true">
      <div className="pet-track pet-track-a">
        <div className="pet-sprite pet-sprite-a" title="Screen pet">
          <span className="pet-ear pet-ear-a" />
          <span className="pet-ear pet-ear-b" />
          <span className="pet-body" />
          <span className="pet-eyes" />
          <span className="pet-tail" />
          <span className="pet-legs" />
        </div>
        <div className="pet-shadow pet-shadow-a" />
        <div className="pet-zzz pet-zzz-a">zZ</div>
      </div>

      <div className="pet-track pet-track-b">
        <div className="pet-sprite pet-sprite-b" title="Screen pet">
          <span className="pet-ear pet-ear-a" />
          <span className="pet-ear pet-ear-b" />
          <span className="pet-body" />
          <span className="pet-eyes" />
          <span className="pet-tail" />
          <span className="pet-legs" />
        </div>
        <div className="pet-shadow pet-shadow-b" />
        <div className="pet-zzz pet-zzz-b">z</div>
      </div>

      <div className="pet-note">Pets Extension Active</div>
    </div>
  );
}
