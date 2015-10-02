var name = 'foo';
var age = 42;
var job = 'Developer';
var person = {
  name,
  age,
  job,
  talk() {
    return 'I am ' + this.name + ', age of ' + this.age + ' and I work as ' + this.job + '.';
  }
};

// ‘I am foo, age of 42 and I work as Developer.’
console.log(person.talk());
