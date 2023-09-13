const typeCache: { [label: string]: boolean } = {};

export function type(label: string): string {
  if (typeof label !== 'string') {
    throw new Error(`Action type "${label}" is not string"`);
  } else if (typeCache[label.toString()]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[label.toString()] = true;

  return label;
}
