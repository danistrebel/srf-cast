'use strict';

var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");

class Podcast {
  constructor(options) {
    this.title = options.title;
    this.description = options.description;
    this.imageSrc = options.imageSrc;
    this.lqPodcastSrc = options.lqPodcastSrc;
    this.hqPodcastSrc = options.hqPodcastSrc;
  }
}

request({
  uri: "http://www.srf.ch/podcasts",
}, function(error, response, body) {
  var $ = cheerio.load(body);

  var podcasts = [];

  $("li.shows").each(function() {
    var show = $(this);
    var titleNode = show.find('h3');
    var descriptionNode = titleNode.next('p');
    var imageNode = show.find('img');
    var lqPodcastNode = show.find('input[name="aac-feed"]');
    var hqPodcastNode = show.find('input[name="hd-feed"]');

    podcasts.push(new Podcast({
      title: titleNode.text().trim(),
      description: descriptionNode.text().trim(),
      imageSrc: imageNode.attr('data-retina-src'),
      lqPodcastSrc: lqPodcastNode.val(),
      hqPodcastSrc: hqPodcastNode.val()
    }));
  });

  fs.writeFile('./srf-podcasts.json', JSON.stringify(podcasts, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Wrote: ' + podcasts.length + 'podcasts');
      }
  });
});
