const Handlebars = require('handlebars');

Handlebars.registerHelper('formatProp', function (prop) {
  let arr = [];
  for (let val of Object.values(prop)) {
    arr.push(` ${val}`);
  }
  return arr;
});

Handlebars.registerHelper('formatIfNone', function (prop) {
  if (prop !== '') {
    return prop;
  } else return 'https://mainfacts.com/media/images/coats_of_arms/ua.svg';
});
