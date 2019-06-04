require('dotenv').config();
const express = require('express');
const app = express();
const getStoriesMetadata = require('./getStoriesMetadata');
const getStoriesDetails = require('./getStoriesDetails');
const filterStories = require('./filterStories.js');
const shuffle = require('shuffle-array');
const fs = require('fs');

app.use(express.static('client'));
app.use(express.json())

app.get('/api/latest', async function (req, res) {
  let stories = await getStoriesMetadata();
  stories = filterStories(stories);
  res.json(stories);
});

app.post('/api/latest', async function (req, res) {
  const ids = req.body.ids || null;
  console.log(req.body);
  let stories = await getStoriesMetadata();
  stories = filterStories(stories, ids);
  for (story of stories) {
    const details = await getStoriesDetails(story.id);
    story.content = details.content;
    story.image = details.image;
    story.minutes = Math.round(story.content.split(" ").length / 250);
  }
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