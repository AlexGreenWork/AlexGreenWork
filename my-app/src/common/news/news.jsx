import React from "react";
import s1 from "./news.module.css";
import s from "./contentContainer.module.css";
import { NavLink } from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";




class News extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{width:"100%",
      position:"relative",
      display:"flex",
      justifyContent:"center"}}>
          <ContentContainer />
      <div style={{
          position: "absolute",
          display: "flex",
          justifycontent: "center",
          width:"65vw",
          top:0,
          justifyContent:"center",
            height:"100%"
      }}>
        <div
          style={{
            width:"100%"

          }}
        >
          <iframe
            style={{ height: "100%" }}
            className={s1.framePortal}
            src="http://integrity.belaz.minsk.by/portal/ideology/board/news.php"
          ></iframe>
        </div>
      </div>
      </div>
    );
  }
}

export default News;
