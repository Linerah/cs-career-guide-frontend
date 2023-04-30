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
import Blog from "../blog/Blog"

function Resource() {
    const profChoices = ['Programming Languages', 'Data Structures', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human/Computer Interaction', 'Artificial Intelligence']
    const {currentUser} = useContext((AuthContext))
    console.log(currentUser)
    const [blogs, setBlogs] = useState([]);
    const handleBlogValues = (blogValues) => {
        console.log('Im heree')
        console.log(blogValues)
        setBlogs(blogValues);
    };
    const [blogTag, setBlogTag] = useState('Programming Languages');
    useEffect(() => {
        axios.get('https://cscg-blog-search-service.herokuapp.com/blogs', {
            params: {
              "user_id": currentUser._id
            }
          })
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

    const handleBlogChangeTag = (event) => {
        const value = event.target.value;
        setBlogTag(value);
    };

    async function handleBlogSubmit(event) {
        let inputs = {}
        event.preventDefault(); // prevent page refresh
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            inputs[key] = value;
        }
        inputs['user_id'] = currentUser._id
        await axios.post("https://cscg-blog-search-service.herokuapp.com/create_blog", inputs);
        window.location.reload(false);
        setIsModalOpen(false);
    }

    return <>
    
    <Banner page="home"/>
<div className={'main'}>
    <div className="flex justify-center divider_container">
        <div className="Divider_Tittle"> Blogs </div>
            <div className="Divider">
            
        </div>
        <Search onBlogs={handleBlogValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/blogs",resource: "blogs", options: ["","Newest", "Oldest", "Most upvote", 'Programming Languages', 'Data Structures', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human/Computer Interaction', 'Artificial Intelligence']}}/>
    </div>
<div className={isModalOpen ? "opacity-70 flex relative justify-center" : "opacity-100 flex relative justify-center"}>
    {console.log(blogs)}<Swiper
        className={'flex justify-center'}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Pagination]}
      >
        {blogs.map((blog) => (

            currentUser.isProfessor ?
                (currentUser._id === blog.user_info[0]._id ?
               <SwiperSlide > <Blog data={{title: blog.title, information: blog.information, link: blog.link, blog_id: blog.blog_id, upvote: blog.upvote, tag: blog.tag, name: blog.user_info[0].name}}/></SwiperSlide> :
               null) :
                <SwiperSlide > <Blog data={{title: blog.title, information: blog.information, link: blog.link, blog_id: blog.blog_id, upvote: blog.upvote,tag: blog.tag, name: blog.user_info[0].name, }}/> </SwiperSlide>
                ))}
      </Swiper>

        {currentUser.isProfessor && <button className="m-auto absolute top-24 right-20 bg-colegio-light-green text-colegio-background rounded-full h-12 w-12" onClick={handleOpenModal}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
        </svg></button>}
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

                  <label htmlFor="underline_select" className="sr-only">Tag</label>
                  <select  value={blogTag} onChange={handleBlogChangeTag} id="underline_select"
                          className="mb-2 block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-background font-bold font-sans peer">
                                          {profChoices.map((value) => (
                        <option className="bg-colegio-green font-bold font-sans" value={value}>{value}</option>
                    ))}
                    <input type="text" name="tag" value={blogTag}/>
                  </select>
                  <button className="bg-colegio-green-2 text-colegio-dark-green font-sans font-bold rounded-lg p-2 float-right" type="submit" value="Submit" > Submit </button>
              </div>
        </form>
      </Modal>
</div>

    <div className="flex justify-center divider_container">
        <div className="Divider_Tittle">Organizations</div>
            <div className="Divider">
        </div>
        <Search  data={{route: "",resource: "orgs", options: ["","Newest", "Oldest", "Most upvote"]}}/> 
    </div>
    <div className="flex space-x-6 justify-center">
        <Swiper
        className={'flex justify-center '}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Pagination]}
      >
            <SwiperSlide><Organization /></SwiperSlide>
            <SwiperSlide><Organization /></SwiperSlide>
            <SwiperSlide><Organization /></SwiperSlide>
            <SwiperSlide><Organization /></SwiperSlide>

      </Swiper>

    </div>

    <div className="flex justify-center divider_container">
        <div className="Divider_Tittle">Research</div>
            <div className="Divider">
        </div>
        <Search  data={{route: "",resource: "research", options: ["","Newest", "Oldest"]}}/> 
    </div>
    <div className="flex space-x-6 justify-center">
        <Swiper
        className={'flex justify-center '}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Pagination]}
      >
            <SwiperSlide><Research/></SwiperSlide>
            <SwiperSlide><Research/></SwiperSlide>
            <SwiperSlide><Research/></SwiperSlide>
            <SwiperSlide><Research/></SwiperSlide>

      </Swiper>
    </div>
        </div>
    </>
}
export default Resource;


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