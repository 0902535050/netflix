import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Trang Chủ</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Phim Bộ</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Phim Lẻ</span>
          </Link>
          <span>Phim mới & Phổ biến</span>
          <span>Yêu Thích</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>TEST</span>
          <Notifications className="icon" />
          <img
            src="https://img5.thuthuatphanmem.vn/uploads/2021/07/14/logo-hutech-tron_012635653.png"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;