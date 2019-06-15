const request = require('request-promise-native');

module.exports = async function(id) {
  let story = await request({
    url: `https://www.theatlantic.com/api/2.0/articles/${id}/`, 
    method: 'GET',
    headers: {
      Authorization: process.env.ATL_TOKEN,
    }
  });

  story = JSON.parse(story);
  let image;
  if (story.image.thumbs) {
    image = story.image.thumbs.facebook.url
  }
  return {
    content: story.content,
    image
  }
}