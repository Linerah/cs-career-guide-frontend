import React, { useState, useContext, useEffect} from 'react';
import {AuthContext} from "../auth/AuthContext";
import "./Upvote.css"
import axios from "axios";

function Upvote(props) {
  const {currentUser} = useContext((AuthContext))
  const [isClicked, setIsClicked] = useState(props.data.upvote);
  const [upvotes, setUpvotes] = useState(0);
  const apiEndpoint = 'https://cs-career-guide-upvote-service.herokuapp.com/upvote';

  async function updateVoteCount(count) {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        "value": count,
        "blog_id": props.data.blog_id,
        "user_id": currentUser._id
    } )
    });
    if (!response.ok) {
      throw new Error('Failed to update vote count.');
    }
  }

    
    useEffect(() => {
        axios.post('https://cs-career-guide-upvote-service.herokuapp.com/upvote_count', 
        {
            "blog_id": props.data.blog_id
          })
          .then(response => {
            console.log(response.data)
            setUpvotes(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      });

  async function handleClick() {
    const count = isClicked ? -1 : 1;
    updateVoteCount(count);
    try {
      const response = await axios.post('https://cs-career-guide-upvote-service.herokuapp.com/upvote_count', {
        "blog_id": props.data.blog_id
      });
      console.log(response.data);
      setUpvotes(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsClicked(!isClicked);
  }
  const buttonClass = isClicked ? 'clicked' : 'unclicked';
  return (
    <button className={buttonClass} onClick={handleClick}>
      <span class="material-symbols-outlined"> 
north
</span> <div className=''>{upvotes}</div>
    </button>
  );
}

export default Upvote;