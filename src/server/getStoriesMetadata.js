const request = require('request-promise-native');

module.exports = async function() {
  let feed = await request({
    url: 'https://www.theatlantic.com/api/2.0/articles/?preview=false', 
    method: 'GET',
    headers: {
      Authorization: process.env.ATL_TOKEN,
    }
  });

  feed = JSON.parse(feed);
  feed = feed.results.map((story) => {
    return {
      authors: story.authors.map(d => d.name),
      title: story.title,
      published: story.date_published_iso,
      summary: story.dek,
      url: story.url,
      id: parseInt(story.pk)
    }
  });
  return feed;
}