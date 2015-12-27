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

  handleMediaSelection: function(media) {
    this.setState({
      dialogIsOpen: false,
      playingMedia: media
    });
  },

  cancelPlayer: function() {
    this.setState({
      dialogIsOpen: true,
      playingMedia: undefined
    });
  },

  render: function() {

    var eposodesDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        disabled={false}
        onClick={this.hideEpisodes} />
      ];

    var eposodesDialog = (
      <Dialog
          title="Podcast Episodes"
          actions={eposodesDialogActions}
          modal={true}
          open={this.state.dialogIsOpen}>
          <PodCastEpisodesList link={this.props.link} playMedia={this.handleMediaSelection}/>
        </Dialog>
    );

    var playerDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        disabled={false}
        onClick={this.cancelPlayer} />
      ];

    var playerDialog = (
      <Dialog
          title="Player"
          actions={playerDialogActions}
          modal={true}
          open={!!this.state.playingMedia}>
          <video width="100%" height="100%" controls>
            <source src={this.state.playingMedia} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        </Dialog>
    );


    return (
      <span className="dialog-launcher">
        <RaisedButton label={this.props.label} onClick={this.showEpisodes}/>
        {eposodesDialog}
        {playerDialog}
      </span>
    );
  }
})

export default PodcastEpisodesDialogComponent;
