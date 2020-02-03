var values = require('./values.json');

var sorted = values.Items.sort(function (a, b) {
  return a.state.S - b.state.S;
});

sorted = sorted.map(function (item) {
  if (item.state.S !== 'latest') {
    let timeStamp = parseInt(item.state.S, 10);
    let date = new Date(timeStamp);
    item.state.S = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    return item;
  }
});
let collection = {};
sorted.forEach(function (item) {
  if (item) {
    collection[item.state.S] = item;
  }
});
values.Count = Object.values(collection).length;
values.ScannedCount = Object.values(collection).length;
values.Items = Object.values(collection);
console.log(JSON.stringify(Object.values(collection)));
