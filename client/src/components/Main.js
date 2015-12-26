require('normalize.css');
require('styles/App.css');

import React from 'react';

var AppComponent = React.createClass({
  getInitialState: function() {
    return {podcasts: []};
  },
  componentDidMount: function() {
    var request = require('superagent');
    request
      .get('https://gist.githubusercontent.com/danistrebel/32e7496edb52b43afb02/raw/3b32f503943996a660fe23a46e91defede691107/srf-podcasts.json')
      .end(function(err, res){
          if(res.ok) {
            this.setState({podcasts: JSON.parse(res.text)});
          }
      }.bind(this));
  },
  render: function() {

    var podcastNodes = this.state.podcasts.map(function(podcast, i) {
      return (
        <Podcast podcast={podcast} key={i} />
      );
    });

    return (
      <div>
        <section className="podcast-header">
          <h3>SRF Podcast List</h3>
          <section className="podcast-container">
            {podcastNodes}
          </section>
        </section>
      </div>
    );
  }
});

export default AppComponent;

var Podcast = React.createClass({
  render: function() {
    var podcast = this.props.podcast
    return (
      <div className="podcast-entry">
        <div><img src={podcast.imageSrc}/></div>
        <div className="podcast-title"><h5>{podcast.title}</h5></div>
        <ul>
          <li><a href={podcast.lqPodcastSrc}>LQ</a></li>
        </ul>
      </div>
    )
  }
})
