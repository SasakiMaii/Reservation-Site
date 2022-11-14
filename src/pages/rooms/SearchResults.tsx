import { Link } from "react-router-dom";
import RoomSearchSoart from "../../components/rooms/RoomSearchSoart";
import Pageing from "../../components/rooms/Pageing";
import Header from "../../components/layout/Header";
import SearchResultsStyle from "../../styles/rooms/_SearchResult.module.scss";

import firebase from 'firebase/app';

import 'firebase/auth';
import "../../Firebase"
// import "firebase";
import React, { useEffect, useState } from 'react'
import db from "../../Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import Footer from "../../components/layout/footer";


const SearchResults = () => {

  const [posts, SetPosts] = useState<any>([]);

  useEffect(() => {
    const postDate = collection(db, "gestRoomType");
    getDocs(postDate).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => doc.data()))
      // console.log(snapShot.docs.map((doc,index) => doc.data()))
      // SetPosts(snapShot.docs.map((doc) => doc.data()))
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
      SetPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
    })
  }, [])


  return (
    <>
      <Header />
      <p className={SearchResultsStyle.searchReasults}>・・・空室検索結果</p>
      <RoomSearchSoart />
      <p className={SearchResultsStyle.searchReasultEmpty}>現在空室はありません</p>

      {/* {
        posts.map((list: any, index: number) => {
          return (
            <div key={index}>
              <ul >
                <li>{list.area}</li>
                <li>{list.bedType}</li>
                <li>{list.capacityarea}</li>
                <li>{list.price}</li>
                <li>{list.roomFacility}</li>
              </ul>
              <hr />
            </div>
          )
        })
      } */}

      <Pageing />
      <Link to={`/`}>ホームに戻る</Link>
      <Footer/>
    </>
  );
};

export default SearchResults;
