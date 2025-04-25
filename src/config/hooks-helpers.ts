const abbrNum = (number: number, decPlaces: number): string | number => {
  const factor = Math.pow(10, decPlaces);
  const abbrev = ['k', 'm', 'b', 't'];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * factor) / size) / factor;

      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      return number + abbrev[i];
    }
  }

  return number;
};

export { abbrNum };
