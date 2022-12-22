import React from "react";
import { useState, useEffect } from "react";
import style from "../../styles/top/_Top.module.scss";
import { Link } from "react-router-dom";

const News = () => {
  const [newsdate, setNewsdate] = useState([]);
  useEffect(() => {
    new Promise((resolve: any, reject: any) => {
      fetch("http://localhost:5000/news")
        .then((res) => res.json())
        .then((data) => {
          setNewsdate(data);
        });
    });
  }, []);
  console.log(newsdate);

  return (
    <div className={style.newsContainer}>
      {newsdate.length > 0 ? (
        <div>
          <h2>NEWS</h2>
          {newsdate.map((news: any, index: number) => {
            return (
              <div key={index}>
                <Link to="#">
                  <p>{news.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default News;
