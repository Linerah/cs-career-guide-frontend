import "./Resource.css"
import Banner from "../components/banner";
import Modal from "../components/modal";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import Search from "../search/Search";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import {Navigation, Pagination} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react";
import {AuthContext} from "../auth/AuthContext";
import Blog from "../blog/Blog"
import Research from "../research/research"
import Organization from "../organization/organization"


function Resource() {
    const profChoices = ['Programming Languages', 'Data Structures', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human/Computer Interaction', 'Artificial Intelligence']
    const {currentUser} = useContext((AuthContext))
    const [loading, setLoading] = useState(true);
    const [researchs, setResearch] = useState([]);
    const [organizations, setOrganization] = useState([]);


    const [selectedFile, setSelectedFile] = useState(null);
    const [base64String, setBase64String] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false)
    const handleResearchValues = (researchValues) => {
        setResearch(researchValues)
    }
        const handleOrganizationValues = (organizationValues) => {
        setOrganization(organizationValues)
    }
    const [blogs, setBlogs] = useState([]);
    const handleBlogValues = (blogValues) => {
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
            setBlogs(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    useEffect(() => {
        axios.get('https://cscg-blog-search-service.herokuapp.com/research', {
            params: {
              "user_id": currentUser._id
            }
          })
          .then(response => {
            setResearch(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
     useEffect(() => {
        axios.get('https://cscg-blog-search-service.herokuapp.com/get_organization', {
            params: {
              "user_id": currentUser._id
            }
          })
          .then(response => {
            console.log(response.data)
            setOrganization(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const [isModalOpen, setIsModalOpen] = useState(false); // This one is to simplify hiding carousel
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);

    const handleOpenModal = (event) => {

        setIsModalOpen(true);
        if (event.currentTarget.name === 'blogModal'){
            setIsBlogModalOpen(true)
        }else if (event.currentTarget.name === 'researchModal'){
            setIsResearchModalOpen(true)
        }
    };

    const handleCloseModal = () => {
        setIsBlogModalOpen(false);
        setIsResearchModalOpen(false);
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
        setIsModalOpen(false);
        window.location.reload(false);

    }
    const handleFileChange = (event) => {
        setFileUploaded(false); //In case of uploading a file then changing it

        const uploadedFile = event.target.files[0];
        setSelectedFile(uploadedFile);

        const reader = new FileReader();
        reader.onload = () => {

                console.log("File uploaded successfully");
                setFileUploaded(true);
            };
        reader.readAsDataURL(uploadedFile);
        console.log(uploadedFile);
        setSelectedFile(uploadedFile);
        };


    async function handleResearchSubmit(event) {
        let inputs = {}
        event.preventDefault()
        console.log(selectedFile);
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            inputs[key] = value;
        }

        inputs['user_id'] = currentUser._id;
        const fileBlob = selectedFile
        const reader = new FileReader();


        //reader.onload = () => {
        //    console.log(1);
        //    console.log(reader.result)
        //    const base64 = reader.result.replace("data:application/pdf;base64,", "");
        //    console.log(base64)
        //    inputs['file'] = base64
            //setBase64String(base64);
            //console.log(base64String);
        //}
        await new Promise((resolve) => {
            reader.readAsDataURL(fileBlob);
            reader.onload = () => {
                const base64 = reader.result.replace("data:application/pdf;base64,", "");
                inputs['file'] = base64;
                resolve(true);
            };

    });
        await axios.post("https://cscg-blog-search-service.herokuapp.com/create_research", inputs)
        setIsModalOpen(false);
        window.location.reload(false);
    }

    return <>
    
    <Banner page="home"/>
<div className={'main'}>
    <div className="flex justify-center divider_container">
        <div className="Divider_Tittle"> Blogs </div>
            <div className="Divider">
            
        </div>
       <Search onSection={handleBlogValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/blogs",resource: "blogs", options: [" ","Newest", "Oldest", "Most upvote", 'Programming Languages', 'Data Structures', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human/Computer Interaction', 'Artificial Intelligence']}}/>
    </div>
<div className={isModalOpen ? "opacity-70 flex relative justify-center blog_height" : "opacity-100 flex relative justify-center blog_height"}>
    <Swiper
        className={'flex justify-center'}
        slidesPerView={'auto'}
        spaceBetween={0}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      >
        {loading ?
            <div>
              <SwiperSlide > 
            <div class="Blog flex overflow-hidden justify-center">
            <div className="w-1/2 animate-pulse bg-colegio-light-green"></div>
            <div className="p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2 h-7 flex items-center justify-center"> 
                <div class="animate-pulse h-2 bg-white rounded w-1/2"></div>
            </div>
            <div className="animate-pulse Blog_container w-1/2 overflow-hidden">
                <div className="Blog_professor_container flex w-100 justify-center items-center">
                    <div className="profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <div class="rounded-full bg-white h-10 w-10"></div>
                        </div>

                    </div>
                    <div class="h-2 bg-colegio-light-green rounded w-1/6"></div>
                
                </div>
                <div class="loading_blog_info_container space-y-2 items-center">
                    <div class="h-2 bg-white rounded w-1/2 "></div>
                    <div class="w-full flex justify-center items-center flex-col space-y-1">
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                    </div>  
                </div>
                <div className="Blog_button_container space-x-3">
                    <button className="loading_upvote h-2/3">
                        
                    </button>
                    <button className="Blog_button rounded-lg font-bold h-2/3">
                
                    </button>
                   
                </div>
            </div>
            </div>
            </SwiperSlide > 
            <SwiperSlide > 
            <div class="Blog flex overflow-hidden justify-center">
            <div className="w-1/2 animate-pulse bg-colegio-light-green"></div>
            <div className="p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2 h-7 flex items-center justify-center"> 
                <div class="animate-pulse h-2 bg-white rounded w-1/2"></div>
            </div>
            <div className="animate-pulse Blog_container w-1/2 overflow-hidden">
                <div className="Blog_professor_container flex w-100 justify-center items-center">
                    <div className="profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <div class="rounded-full bg-white h-10 w-10"></div>
                        </div>

                    </div>
                    <div class="h-2 bg-colegio-light-green rounded w-1/6"></div>
                
                </div>
                <div class="loading_blog_info_container space-y-2 items-center">
                    <div class="h-2 bg-white rounded w-1/2 "></div>
                    <div class="w-full flex justify-center items-center flex-col space-y-1">
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                    </div>  
                </div>
                <div className="Blog_button_container space-x-3">
                    <button className="loading_upvote h-2/3">
                        
                    </button>
                    <button className="Blog_button rounded-lg font-bold h-2/3">
                
                    </button>
                   
                </div>
            </div>
            </div>
            </SwiperSlide > 
            <SwiperSlide > 
            <div class="Blog flex overflow-hidden justify-center">
            <div className="w-1/2 animate-pulse bg-colegio-light-green"></div>
            <div className="p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2 h-7 flex items-center justify-center"> 
                <div class="animate-pulse h-2 bg-white rounded w-1/2"></div>
            </div>
            <div className="animate-pulse Blog_container w-1/2 overflow-hidden">
                <div className="Blog_professor_container flex w-100 justify-center items-center">
                    <div className="profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <div class="rounded-full bg-white h-10 w-10"></div>
                        </div>

                    </div>
                    <div class="h-2 bg-colegio-light-green rounded w-1/6"></div>
                
                </div>
                <div class="loading_blog_info_container space-y-2 items-center">
                    <div class="h-2 bg-white rounded w-1/2 "></div>
                    <div class="w-full flex justify-center items-center flex-col space-y-1">
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                        <div class="h-2 bg-colegio-light-green rounded w-3/5 "></div>
                    </div>  
                </div>
                <div className="Blog_button_container space-x-3">
                    <button className="loading_upvote h-2/3">
                        
                    </button>
                    <button className="Blog_button rounded-lg font-bold h-2/3">
                
                    </button>
                   
                </div>
            </div>
            </div>
            </SwiperSlide > 
            
          
            </div>
            : blogs.map((blog) => (
            currentUser.isProfessor ?
                (currentUser._id === blog.user_info[0]._id ?
               <SwiperSlide > <Blog data={{title: blog.title, information: blog.information, link: blog.link, blog_id: blog.blog_id, upvote: blog.upvote, tag: blog.tag, name: blog.user_info[0].name}}/></SwiperSlide> :
               null) :
                <SwiperSlide > <Blog data={{title: blog.title, information: blog.information, link: blog.link, blog_id: blog.blog_id, upvote: blog.upvote,tag: blog.tag, name: blog.user_info[0].name, }}/> </SwiperSlide>
                ))
        }
      </Swiper>

        {currentUser.isProfessor && <button name="blogModal" className="m-auto absolute top-24 right-20 bg-colegio-light-green text-colegio-background rounded-full h-12 w-12" onClick={handleOpenModal}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
        </svg></button>}
</div>
    <div>
      <Modal isOpen={isBlogModalOpen} onClose={handleCloseModal}>
        <h1 className="text-colegio-background font-sans font-bold text-xl m-2 text-center">Share a new Blog!</h1>
          <form onSubmit={handleBlogSubmit}>
              <div className="">

                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="title" id="title"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="title"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                  </div>
                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="information" id="information"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="information"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Information</label>
                  </div>
                                        <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="link" id="link"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="link"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link</label>
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
        <div className="Divider_Tittle">Research</div>
            <div className="Divider">
        </div>

        <Search onSection={handleResearchValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/research",resource: "research", options: [" ","Newest", "Oldest", "Most upvote", 'Programming Languages', 'Data Structures', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human/Computer Interaction', 'Artificial Intelligence']}}/>
    </div>
<div className={isModalOpen ? "opacity-70 flex relative justify-center research_height" : "opacity-100 flex relative justify-center research_height"}>
        <Swiper
        className={'flex justify-center '}
        slidesPerView={'auto'}
        spaceBetween={0}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      >
            {researchs.map((research) => (
                <SwiperSlide > <Research data={{title: research.title, information: research.information,
                    link: research.link, research_id: research.research_id, tag: research.tag,  file: research.file, name: research.user_info[0].name}}/>

                </SwiperSlide>
                ))}

      </Swiper>
    {currentUser.isProfessor && <button name="researchModal" className="m-auto absolute top-24 right-20 bg-colegio-light-green text-colegio-background rounded-full h-12 w-12" onClick={handleOpenModal}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
        </svg></button>}
    </div>
          <Modal isOpen={isResearchModalOpen} onClose={handleCloseModal}>
        <h1 className="text-colegio-background font-sans font-bold text-xl m-2 text-center">Share a new Research!</h1>
          <form onSubmit={handleResearchSubmit}>
              <div className="">
                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="title" id="title"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="title"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                  </div>
                      <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="information" id="information"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="information"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Information</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="link" id="link"
                             className="font-sans font-bold block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-green-2  peer"
                             placeholder=" " required/>
                      <label htmlFor="link"
                             className="font-sans font-bold peer-focus:font-medium absolute text-xl text-colegio-background duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colegio-green-2 peer-focus:dark:text-colegio-green-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link</label>
                  </div>

                  <label htmlFor="underline_select" className="sr-only">Tag</label>
                  <select  value={blogTag} onChange={handleBlogChangeTag} id="underline_select"
                          className="mb-2 block py-2.5 px-0 w-full text-lg text-colegio-background bg-transparent border-0 border-b-2 border-colegio-background appearance-none focus:outline-none focus:ring-0 focus:border-colegio-background font-bold font-sans peer">
                                          {profChoices.map((value) => (
                        <option className="bg-colegio-green font-bold font-sans" value={value}>{value}</option>
                    ))}
                    <input type="text" name="tag" value={blogTag}/>
                  </select>
                  <label className="block mb-2 mt-4 text-lg font-bold font-sans text-colegio-background" htmlFor="file">Upload
                      file</label>
                  <input
                      id="file" type="file" accept=".pdf" className="block w-full text-lg bg-colegio-green border border-colegio-background rounded-lg cursor-pointer text-colegio-background focus:outline-none placeholder-blue-700 "
                       onChange={handleFileChange}/>
                  <button disabled={!fileUploaded} className="disabled:opacity-25 mt-2 bg-colegio-green-2 text-colegio-dark-green font-sans font-bold rounded-lg p-2 float-right" type="submit" value="Submit" > Submit </button>
              </div>
        </form>
      </Modal>
        <div className="flex justify-center divider_container">
        <div className="Divider_Tittle">Organizations</div>
            <div className="Divider_Organization">
        </div>
    </div>
            <Search onSection={handleOrganizationValues} data={{route: "https://cscg-blog-search-service.herokuapp.com/research",resource: "organization", options: []}}/>
 <div className={isModalOpen ? "opacity-70 flex relative justify-center org_height" : "opacity-100 flex relative justify-center org_height"}>
        <Swiper
        className={'flex justify-center '}
        slidesPerView={'auto'}
        spaceBetween={0}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }}


      >
            {organizations.map((organization) => (
                <SwiperSlide > <Organization data={{title: organization.title, info: organization.info,
                    link: organization.link, logo_url: organization.logo_url, logo_name: organization.logo_name}}/>
                </SwiperSlide>
                ))}
      </Swiper>
    </div>
        </div>
    </>
}
export default Resource;


