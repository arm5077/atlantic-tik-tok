const express = require('express');
const app = express();
const getStories = require('./getStoriesFromRSS');
const filterStories = require('./filterStories.js');
const shuffle = require('shuffle-array');
const fs = require('fs');

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

app.post('/api/wormhole', function(req, res) {
  const wormholeStories = JSON.parse(fs.readFileSync(`${__dirname}/data/stories.json`, 'utf8'));
  const ids = req.body.ids || [];
  let stories = wormholeStories.filter(story => ids.indexOf(parseInt(story.id)) == -1);
  shuffle(stories);
  res.json(stories.slice(0,25));
});

app.listen(process.env.PORT || 61386, () => console.log(`Listening on port ${process.env.PORT || 61386}!`));