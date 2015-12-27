require('normalize.css');
require('styles/App.css');

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import PodCastEpisodesList from './PodcastsEpisodesList';

var PodcastEpisodesDialogComponent = React.createClass({

  getInitialState: function() {
    return {
      dialogIsOpen: false
    };
  },

  showEpisodes: function() {
    this.setState({dialogIsOpen: true});
  },

  hideEpisodes: function() {
    this.setState({dialogIsOpen: false});
  },

  render: function() {

    var actions = [
      <FlatButton
        label="Close"
        primary={true}
        disabled={false}
        onClick={this.hideEpisodes} />
      ];

    var eposodesDialog = (
      <Dialog
          title="Podcast Episodes"
          actions={actions}
          modal={true}
          open={this.state.dialogIsOpen}>
          <PodCastEpisodesList link={this.props.link}/>
        </Dialog>
    );

    var episodesDialogOption = this.state.dialogIsOpen ? eposodesDialog : undefined;

    return (
      <span>
        <RaisedButton label={this.props.label} onClick={this.showEpisodes}/>
        {episodesDialogOption}
      </span>
    );
  }
})

export default PodcastEpisodesDialogComponent;
