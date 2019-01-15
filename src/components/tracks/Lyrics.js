import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";

class Lyrics extends Component {
  state = {
    lyrics: {}
  };

  getTrack(Track) {
    for (let i = 0; i < Track.length; i++) {
      if (Track[i].track.track_id.toString() === this.props.match.params.id) {
        return Track[i].track;
      }
    }
  }

  componentDidMount() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ lyrics: data.message.body.lyrics });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list } = value;
          const { lyrics } = this.state;
          if (
            lyrics === undefined ||
            Object.keys(lyrics).length === 0 ||
            track_list.length === 0 ||
            track_list === undefined
          ) {
            return <Spinner />;
          } else {
            const track = this.getTrack(track_list);
            return (
              <React.Fragment>
                <Link to="/" className="btn btn-dark btn-sm mb-4">
                  Go Back
                </Link>
                <div className="card">
                  <h5 className="card-header">
                    {track.track_name} by{" "}
                    <span className="text-secondary">{track.artist_name}</span>
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                      {lyrics.lyrics_body === ""
                        ? lyrics.lyrics_copyright
                        : lyrics.lyrics_body}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Lyrics;
