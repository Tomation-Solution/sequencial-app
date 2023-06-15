export function limitTextLength(chars: number, text: string): string {
  if (text.length <= chars) {
    return text;
  } else {
    return text.slice(0, chars) + "...";
  }
}

export function convertToTitleCase(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
