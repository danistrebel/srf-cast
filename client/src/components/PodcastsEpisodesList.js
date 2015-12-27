require('normalize.css');
require('styles/App.css');

import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FlatButton from 'material-ui/lib/flat-button';

var PodCastEpisodesListComponent = React.createClass({

  loadFeeds: function() {

    function feedsCallback(feedsPromise, self) {
      feedsPromise.then((res) => {
        if (res.responseStatus === 200 && res.responseData.feed.entries) {

          var entries = res.responseData.feed.entries;

          var xml = res.responseData.xmlString;
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xml,'text/xml');

          var items = xmlDoc.getElementsByTagName('item');
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var enclosure = item.getElementsByTagName('enclosure')
            if (enclosure && enclosure[0].getAttribute('url')) {
              var link = enclosure[0].getAttribute('url');
              var title = item.getElementsByTagName('title')[0].childNodes[0].nodeValue;
              entries.map(function(entry) {
                if(entry.title == title) {
                  entry.link = entry.link || link;
                }
                return entry;
              });

            }
          }
          self.setState({
            loadComplete: true,
            entries: entries
          })
        } else {
          self.setState({
            loadComplete: true,
            entries: []
          })
        }
      });
    }

    var GOOGLE_FEED_API_URL = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&output=json_xml&q=';
    var url = GOOGLE_FEED_API_URL + encodeURIComponent(this.props.link);
    fetch(url).then((res) => feedsCallback(res.json(), this));
  },

  componentDidMount: function() {
    this.loadFeeds();
  },

  getInitialState: function() {
    return {
      loadComplete: false,
      entries: []
    };
  },

  playMedia: function(mediaUrl, self) {
    return function() {
      self.props.playMedia(mediaUrl);
    }
  },

  render: function() {
    var self = this;
    var episodes = self.state.entries.map(function(entry, i) {
      return (
        <TableRow key={i}>
          <TableRowColumn>{entry.title}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              label="Play"
              primary={true}
              disabled={false}
              onClick={self.playMedia(entry.link, self)} />
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn tooltip='Name of the episode'>Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Click to play'>Play</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={true}>
          {episodes}
        </TableBody>
      </Table>
    )
  }
})

export default PodCastEpisodesListComponent;
