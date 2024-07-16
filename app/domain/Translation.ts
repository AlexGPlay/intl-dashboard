class Translation {
  key: string;
  values: Record<string, string>;

  constructor(key: string, values: Record<string, string>) {
    this.key = key;
    this.values = values;
  }
}

export default Translation;
