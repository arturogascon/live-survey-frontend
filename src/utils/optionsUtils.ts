export const checkIsOptionRepeated = (options: Array<string>): boolean =>
  options.some((option, i) => {
    if (!option) {
      return false;
    }
    const otherOptions = options.filter((_, currentIdx) => currentIdx !== i);
    return otherOptions.includes(option);
  });
