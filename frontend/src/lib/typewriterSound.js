let audioContext = null;
export function playTypewriterKey(volume) {
    if (typeof window === "undefined") {
        return;
    }
    const context = audioContext ?? new AudioContext();
    audioContext = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(280, context.currentTime);
    gain.gain.setValueAtTime(Math.max(0, Math.min(volume, 1)) * 0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.03);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.03);
}
