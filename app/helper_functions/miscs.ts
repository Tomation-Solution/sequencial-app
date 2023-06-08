export function limitTextLength(chars: number, text: string): string {
  if (text.length <= chars) {
    return text;
  } else {
    return text.slice(0, chars) + "...";
  }
}
