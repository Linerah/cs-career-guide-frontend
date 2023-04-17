import "./Resource.css"
import Banner from "../components/banner";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Search from "../search/Search";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react";
function Resource() {
    const [blogs, setBlogs] = useState([]);
    const handleBlogValues = (blogValues) => {
        console.log('Im heree')
        console.log(blogValues)
        setBlogs(blogValues);
    };

    useEffect(() => {
        axios.get('https://cscg-blog-search-service.herokuapp.com/blogs')
          .then(response => {
            console.log(response.data)
            setBlogs(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
   

    return <>
    
    <Banner page="home"/>

    <div className="flex justify-center my-9">
        
        <div className="Divider_Tittle"> Blogs </div>
            <div className="Divider">
            
        </div>
        <Search onBlogs={handleBlogValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/blogs",resource: "blogs", options: ["","Newest", "Oldest", "Most read", "Most upvote"]}}/> 
    </div>

    <Swiper
        className={'flex justify-center'}
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}

        modules={[Pagination]}
      >
        {blogs.map((blog) => (
            <SwiperSlide><Blog data={{title: blog.title, information: blog.information, link: blog.link}}/></SwiperSlide>
                ))}
      </Swiper>














    <div className="flex justify-center my-9">
        <div className="Divider_Tittle">Organizations</div>
            <div className="Divider">
        </div>
        <Search  data={{route: "",resource: "orgs", options: ["","Newest", "Oldest", "Most upvote"]}}/> 
    </div>
    <div className="flex space-x-6 justify-center">
        <Organization /><Organization /><Organization />
    </div>
    <div className="flex justify-center my-9">
        <div className="Divider_Tittle">Research</div>
            <div className="Divider">
        </div>
        <Search  data={{route: "",resource: "research", options: ["","Newest", "Oldest"]}}/> 
    </div>
    <div className="flex space-x-6 justify-center">
        <Research /><Research /> <Research />
    </div>
    </>
}
export default Resource;

function Blog(props) {

    const handleButtonClick = () => {
        window.open("https://" + props.data.link, '_blank');
      };

    return <div className="Blog flex overflow-hidden justify-center">
        
            <img className=" w-1/2" src="mchine.jpg" alt="logo"></img>
            <div className="Blog_container w-1/2 overflow-hidden">
                <h1 className="Blog_tittle">{props.data.title}
                </h1>
                <h2 className="Blog_information">{props.data.information}</h2>
                <div className="Blog_button_container">
                    <button className="Blog_button rounded-lg font-bold" onClick={handleButtonClick}>
                        Read 
                    </button>
                </div>
            </div>
        </div>
}

function Organization(){
    return <div className="Organization flex overflow-hidden justify-center">
            <div className="Organzation_container"> 
               <div className="Organization_logo rounded-full h-full" >
                    <img className="p-4 w-24 h-24" src="IEEE_logo.png" alt="logo"></img>
                </div> 
                <h1 className="Organization_tittle">IEE Organization</h1>
            </div>    
            <div className="Organzation_container w-1/2">
                <h2 className="Organization_information font-bold">The professional home for the engineering and technology community worldwide</h2>
                <div className="Organzation_button_container pt-4">
                    <button className="Organzation_button rounded-lg font-bold">
                        Join Now!
                    </button>
                </div>
            </div>
        </div>

}

function Research(){
    return <div className="Research flex overflow-hidden justify-center">
            <div className="Research_container"> 
               <div className="Research_logo rounded-full h-full" >
                    <img className="p-4 w-24 h-24" src="NASA_logo.svg.webp" alt="logo"></img>
                </div> 
                <h1 className="Research_tittle">Image Processing </h1>
            </div>    
            <div className="Research_container w-1/2">
                <h2 className="Research_information font-bold">Using satellite data, process images of the earth!</h2>
                <div className="Research_button_container pt-4">
                    <button className="Research_button rounded-lg font-bold">
                        Apply Now!
                    </button>
                </div>
            </div>
        </div>

}