export function e<K extends keyof HTMLElementTagNameMap>(
  type: K,
  props?: Partial<ReturnType<typeof document.createElement>>
) {
  const elem = document.createElement(type);
  Object.entries(props ?? {}).forEach(([propName, value]) => {
    (elem as any)[propName] = value;
  });
  return elem;
}

export function css(strings: TemplateStringsArray, ...replacers: string[]) {
  return strings.flatMap((str, i) => [str, replacers[i] ?? ""]).join("");
}

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const sphereVolume = (radius: number) => (4 / 3) * Math.PI * radius ** 3;
