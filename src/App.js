import './App.css';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Post from './Post';

function App() {

  let posts = [];
  const [postComponents, setPostComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let msInDay = 86400000;
    let date = new Date();
    let dateString = date.toISOString().split('T')[0];

    

    const goBackOneDay = () => {
      date = new Date(date - msInDay);
      dateString = date.toISOString().split('T')[0];
    }

    const queryPhoto = async (date) => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.APIKEY}&date=` + date)
      if (!response.ok) {
        return false;
      } else {
        return response.json();
      }
    };

    const queryPhotos = async () => {
      setLoading(true);
      let i = 1;
      while (i <= 3) {
        const response = await queryPhoto(dateString);
        if (response === false) {
          i--;
        } else {
          posts.push(response);
        }
        i++;
        goBackOneDay();
      }
      setLoading(false);
    };

    
    queryPhotos().then(() => {
      setPostComponents(posts.map((post) =>
      <Post title={post.title} url={post.url} date={post.date}></Post>
      )); 
    })

    const handleScroll = (e) => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      console.log(bottom)
      if (bottom) {
        queryPhotos().then(() => {
          setPostComponents(posts.map((post) =>
          <Post title={post.title} url={post.url} date={post.date}></Post>
          ));
        })
      }
    }


    
    window.addEventListener('scroll', _.throttle(function(div){
      handleScroll();
     }, 1000, {leading:false, trailing:true}), {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className="App">
      <div className="app-title-container">
        <h1>Spacestagram</h1>
      </div>
      <ul className="posts-wrapper">{postComponents}</ul>
      <div>{loading ? <p className="loading-text">Loading...</p> : null}</div>
    </div>
    
  );
}

export default App;
