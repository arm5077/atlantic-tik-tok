const request = require('request-promise-native');
const util = require('util');
const xml2js = require('xml2js');

const Parse = util.promisify(xml2js.parseString);

module.exports = async function() {
  const feedRaw = await request('https://www.theatlantic.com/feed/all/');
  let feed = await Parse(feedRaw);
  feed = feed.feed.entry.map((story) => {

    return {
      content: story.content[0]._,
      author: (story.author) ? story.author.map(d => d.name).join(', ') : null,
      title: story.title[0]._,
      published: story.published[0],
      summary: story.summary[0]._,
      url: story.link[0].$.href.replace('?utm_source=feed', ''),
      id: parseInt(story.link[0].$.href.replace('?utm_source=feed', '').slice(-7).replace('/', ''))
    }
  });
  return feed;
}