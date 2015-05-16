const fortune = require('fortune');

const app = fortune({db: 'blog'});

app.resource('posts', {
  title: String,
  body: String,
  comments: ['comments']
});

app.resource('comments', {
  body: String
});

app.listen(3000);

module.exports = app;
