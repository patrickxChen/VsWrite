export function countWords(input: string): number {
  const text = input.trim();
  if (!text) {
    return 0;
  }
  return text.split(/\s+/).length;
}
