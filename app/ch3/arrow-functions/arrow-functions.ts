var result = [1, 2, 3]
  .reduce((total, current) => total + current, 0);

console.log(result);

var even = [3, 1, 56, 7].filter(el => !(el % 2));

console.log(even);

var data = [];
var sorted = data.sort((a, b) => {
  var diff = a.price - b.price;
  if (diff !== 0) {
    return diff;
  }
  return a.total - b.total;
});
