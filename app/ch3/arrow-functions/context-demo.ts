function MyComponent() {
  this.age = 42;
  setTimeout(() => {
    this.age += 1;
    console.log(this.age);
  }, 100);
}

new MyComponent(); // 43 in 100ms.
