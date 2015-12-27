require('normalize.css');
require('styles/App.css');

import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import PodcastEpisodesDialog from './PodcastEpisodesDialog';

var PodcastCardComponent = React.createClass({
  render: function() {
    var podcast = this.props.podcast

    var podcastButtons = [];
    if (podcast.hqPodcastSrc) { podcastButtons.push({type:'HQ', link: podcast.hqPodcastSrc}); }
    if (podcast.lqPodcastSrc) { podcastButtons.push({type:'LQ', link: podcast.lqPodcastSrc}); }

    var podcatButtonNodes = podcastButtons.map(function(buttonInfo, i) {
      return (
        <PodcastEpisodesDialog link={buttonInfo.link} label={buttonInfo.type} key={i} className="podcast-episodes-button"/>
      );
    });

    return (
      <Card>
        <CardMedia>
          <img src={podcast.imageSrc}/>
        </CardMedia>
        <CardTitle title={podcast.title} subtitle={podcast.type}/>
        <CardActions>
          {podcatButtonNodes}
        </CardActions>
        <CardText>
          {podcast.description}
        </CardText>
      </Card>
    )
  }
})

export default PodcastCardComponent;
