class Person {
  @nonenumerable
  getAnswer() {
    return 42;
  }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

var person = new Person();

for (let prop in person) {
  console.log(prop);
}

console.log(person.getAnswer());