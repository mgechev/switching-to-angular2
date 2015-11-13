var fns = [];
for (var i = 0; i < 5; i += 1) {
  fns.push(function() {
    console.log(i);
  })
}
fns.forEach(fn => fn());

