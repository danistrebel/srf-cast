require('normalize.css');
require('styles/App.css');

import React from 'react';
import PodcastCard from './PodcastCard';
import AppBar from 'material-ui/lib/app-bar';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './Theme';
import CircularProgress from 'material-ui/lib/circular-progress';

var AppComponent = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme)
    };
  },

  loadPodcastMeta: function() {
    var request = require('superagent');
    request
      .get('https://gist.githubusercontent.com/danistrebel/32e7496edb52b43afb02/raw/3b32f503943996a660fe23a46e91defede691107/srf-podcasts.json')
      .end(function(err, res){
          if(res.ok) {
            this.setState({
              isDoneLoading: true,
              podcasts: JSON.parse(res.text)
            });
          }
      }.bind(this));
  },

  getInitialState: function() {
    return {podcasts: []};
  },

  componentDidMount: function() {
    window.setTimeout(this.loadPodcastMeta, 500);
  },
  render: function() {

    var podcastNodes = this.state.podcasts.map(function(podcast, i) {
      return (
        <PodcastCard podcast={podcast} key={i} />
      );
    });

    if (!this.state.isDoneLoading) {
      var beachBall = (
        <div className="beach-ball">
            <CircularProgress mode="indeterminate" size={1.5} />
            <h3>Fetching Podcasts</h3>
        </div>
      )
    }

    return (
      <div>
        <section className="podcast-header">
          <AppBar title="Podcast List"/>
          {beachBall}
          <section className="podcast-container">
            {podcastNodes}
          </section>
        </section>
      </div>
    );
  }
});

export default AppComponent;
