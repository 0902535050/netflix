import { Link, useHistory, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import storage from "../../firebase";
import { updateMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Movie() {
  const location = useLocation();
  const { dispatch } = useContext(MovieContext);
  const movie = location.movie;
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [updateMovie, setUpdateMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateMovies({ ...updateMovie, [e.target.name]: value });
  };

const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + " %done.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdateMovies((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((pre) => pre + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    if (uploaded === 0) {
      setLoading(true);
      e.preventDefault();
      upload([
        { file: img, label: "img" },
      ]);
    } else setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovies(
      updateMovie,
      movie,
      dispatch
    );
    history.push("/movies");
  };


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Phim</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Tạo</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Năm xuất bản:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Giới hạn độ tuổi:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} onChange={handleChange} name="title"/>
            <label>Year</label>
            <input type="text" placeholder={movie.year} onChange={handleChange} name="year"/>
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} onChange={handleChange} name="genre"/>
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} onChange={handleChange} name="limit"/>
            <label>Trailer</label>
            <input type="text" placeholder={movie.trailer} onChange={handleChange} name="trailer"/>
            <label>Video</label>
            <input type="text" placeholder={movie.video} onChange={handleChange} name="video"/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://previews.123rf.com/images/sarahdesign/sarahdesign1509/sarahdesign150901050/44517597-upload-button-upload-icon.jpg"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} name="img" onChange={(e) => setImg(e.target.files[0])}/>
            </div>
            {uploaded === 1 ? (
              <button className="productButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            ) : loading ? (
              <span>Image is loading...</span>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Tải ảnh
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
