// ch3/arrow-functions/simple-reduce.ts
var result = [1, 2, 3].reduce(function (total, current) {
  return total + current;
}, 0); // 6

