require('normalize.css');
require('styles/App.css');

import React from 'react';
import PodcastCard from './PodcastCard';
import AppBar from 'material-ui/lib/app-bar';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './Theme';

var AppComponent = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
    };
  },
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
        <PodcastCard podcast={podcast} key={i} />
      );
    });

    return (
      <div>
        <section className="podcast-header">
          <AppBar title="Podcast List"/>
          <section className="podcast-container">
            {podcastNodes}
          </section>
        </section>
      </div>
    );
  }
});

export default AppComponent;
