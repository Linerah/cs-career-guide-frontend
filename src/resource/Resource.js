import "./Resource.css"
import Banner from "../components/banner";
import Modal from "../components/modal";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import Search from "../search/Search";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react";
import {AuthContext} from "../auth/AuthContext";
function Resource() {

    const {currentUser} = useContext((AuthContext))
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    async function handleBlogSubmit(event) {
        let inputs = {}
        event.preventDefault(); // prevent page refresh
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            inputs[key] = [value];
        }
        inputs['user_id'] = currentUser._id
        await axios.post("https://cscg-blog-search-service.herokuapp.com/create_blog", inputs);
        setIsModalOpen(false);
    }
    return <>
    
    <Banner page="home"/>
    <div className="flex justify-center my-9">
        
        <div className="Divider_Tittle"> Blogs </div>
            <div className="Divider">
            
        </div>
        <Search onBlogs={handleBlogValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/blogs",resource: "blogs", options: ["","Newest", "Oldest", "Most read", "Most upvote"]}}/> 
    </div>
<div className={isModalOpen ? "opacity-70 flex relative" : "opacity-100 flex relative"}>
    <Swiper
        className={'flex justify-center '}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Pagination]}
      >
        {blogs.map((blog) => (
            <SwiperSlide ><Blog data={{title: blog.title, information: blog.information, link: blog.link}}/></SwiperSlide>
                ))}
      </Swiper>
          <button className="absolute right-32 top-50 ml-auto bg-colegio-light-green text-colegio-background rounded-full h-12 w-12" onClick={handleOpenModal}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
        </svg></button>
</div>
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h1 className="text-colegio-background font-sans font-bold text-xl m-2 text-center">Share a new Blog!</h1>
          <form onSubmit={handleBlogSubmit}>
              <div className="">

                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="title" id="title"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="title"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                  </div>
                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="information" id="information"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="information"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Information</label>
                  </div>
                                        <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="link" id="link"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="link"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link</label>
                  </div>

                  <button className="bg-colegio-green-2 text-colegio-dark-green font-sans font-bold rounded-lg p-2 float-right" type="submit" value="Submit" > Submit </button>
              </div>
        </form>
      </Modal>
</div>

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