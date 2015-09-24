var name = 'foo';
var age = 42;
var job = 'Developer';
var person = {
  name: name,
  age: age,
  job: job,
  talk: function () {
    return 'I am ' + this.name + ', and I\'m ' + this.age + ' years old and I work as ' + this.job + '.';
  }
};

// ‘I am foo, and I’m 42 years old and I work as Developer.’
console.log(person.talk());

