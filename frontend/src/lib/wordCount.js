export function countWords(input) {
    const text = input.trim();
    if (!text) {
        return 0;
    }
    return text.split(/\s+/).length;
}
