import { Link, useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { getMovies } from "../../context/movieContext/apiCalls";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { updateLists } from "../../context/listContext/apiCalls";

export default function List() {
  const location = useLocation();
  const list = location.list;
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch } = useContext(ListContext);
  const [lists, setLists] = useState(null);
  const history = useHistory();
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLists({ ...lists, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setLists({ ...lists, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLists(lists, list, dispatch);
    history.push("/");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh sách</h1>
        <Link to="/newList">
          <button className="productAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Kiểu:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Danh sách</label>
            <input
              type="text"
              placeholder={list.title}
              onChange={handleChange}
              name="title"
            />
            <label>Kiểu (Lẻ/bộ)</label>
            <input
              type="text"
              placeholder={list.type}
              name="type"
              onChange={handleChange}
            />
            <label>Thể loại</label>
            <input
              type="text"
              placeholder={list.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="formRight">
              <div className="addListItem">
                <label>Select Movie In List</label>
                <select
                  multiple
                  name="content"
                  onChange={handleSelect}
                  style={{ height: "285px" }}
                >
                  {movies.map((movie) => {
                    return (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button className="productButton" onClick={handleSubmit}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
