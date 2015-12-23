class Human {
  static totalPeople = 0;
  _name; // not required for ES2015 class definition
  constructor(name) {
    this._name = name;
    Human.totalPeople += 1;
  }
  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  talk() {
    return `Hi, I'm ${this.name}!`;
  }
}

class Developer extends Human {
  _languages; // not required for ES2015 class definition
  constructor(name, languages) {
    super(name);
    this._languages = languages;
  }
  get languages() {
    return this._languages;
  }
  talk() {
    return `${super.talk()} And I know ${this.languages.join(', ')}.`;
  }
}
