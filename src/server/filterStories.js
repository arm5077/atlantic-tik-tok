const moment = require('moment');

module.exports = function(stories, ids) {
  const stopwords = [
    'Politics &amp; Policy'
  ];

  // Filter out stories that match stopwords
  let exportStories = stories.filter((story) => {
    let pass = true;
    stopwords.forEach((stopword) => {
      if (story.title.indexOf(stopword) != -1) {
        pass = false;
      }
    });
    return pass
  });

  // Filter out ids of stories the user has already read
  if (ids) {
    exportStories = exportStories.filter((story) => {
      return ids.indexOf(story.id) == -1
    });
  }

  // Filter out stories published more than 24 hours agao
  exportStories = exportStories.filter((story) => {
    const published = moment(story.published);
    return published.isSameOrAfter(moment().subtract(24, 'hours'));
  });

  // Filter out videos and videos
  exportStories = exportStories.filter(story => {
    return story.url.indexOf('/video/') === -1 && story.url.indexOf('/video/') === -1;
  });

  return exportStories
}
