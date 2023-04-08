import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie || {}; // add default empty object in case location or movie is undefined
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      {movie.video ? (
        <video className="video" autoPlay progress controls src={movie.video} />
      ) : (
        <div>Video not found</div>
      )}
    </div>
  );
}
