import React from "react";
import { Link } from "react-router-dom";

const Track = props => {
  const { track, index } = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <h5 className="card-header">
          {index + 1}, {track.track_name}
        </h5>
        <div className="card-body">
          <p className="card-text">
            <strong>
              <i className="fas fa-play" /> Artist
            </strong>
            : {track.artist_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc" /> Album
            </strong>
            : {track.album_name}
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" /> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
