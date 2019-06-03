const express = require('express');
const app = express();
const getStories = require('./getStoriesFromRSS');
const filterStories = require('./filterStories.js');

app.use(express.static('client'));
app.use(express.json())

app.get('/api/stories', async function (req, res) {
  let stories = await getStories();
  stories = filterStories(stories);
  res.json(stories);
});

app.post('/api/stories', async function (req, res) {
  const ids = req.body.ids || null;
  let stories = await getStories();
  stories = filterStories(stories, ids);
  res.json(stories);
});

app.listen(process.env.PORT || 61386, () => console.log(`Listening on port ${process.env.PORT || 61386}!`));