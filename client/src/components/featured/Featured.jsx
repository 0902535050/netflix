import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk1NjE4MmEzMzA0MjJkYzcyNTEyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDkyNzQ3MCwiZXhwIjoxNjgxMzU5NDcwfQ.v96uu-IDsFgAaJj8ehgxkiInna4mjE0RE4VCwfbA3nU",
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Thể loại</option>
            <option value="Hành động">Hành động</option>
            <option value="Phiêu lưu">Phiêu lưu</option>
            <option value="Hài kịch">Hài kịch</option>
            <option value="Tâm lý tội phạm">Tâm lý tội phạm</option>
            <option value="Viễn tưởng">Viễn tưởng</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Lãng mạng">Lãng mạng</option>
            <option value="Khoa học - Viễn tưởng">Khoa học - Viễn tưởng</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Trinh thám">Trinh thám</option>
            <option value="Hoạt hình">Hoạt hình</option>
            <option value="Chính kịch">Chính kịch</option>
          </select>
        </div>
      )}
      
      <img src={content?.img} alt="" />

      <div className="info">
      <img src={content?.imgTitle} alt=""/>
      <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}