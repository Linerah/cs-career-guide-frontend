import './research.css';
import {useContext, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import axios from "axios";



function Research(props){
    const {currentUser} = useContext((AuthContext))
    const [deleteResearch, setDeleteResearch] = useState(false);

    const handleInfoClick = () => {
        window.open(props.data.link, '_blank')
    }
    const handleApplyClick = () => {

    }

    // this is going to break
    const handlePDFClick = () => {
        const pdfData = atob(props.data.file);
        const arrayBuffer = new ArrayBuffer(pdfData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < pdfData.length; i++) {
            uint8Array[i] = pdfData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const dataUri = URL.createObjectURL(blob);
        const newWindow = window.open(dataUri, "_blank", "noopener,noreferrer");
        if (newWindow) {
            newWindow.opener = null;
        }
    }

    function handleDeleteOption() {
        setDeleteResearch(true)
    }

    async function handleDelete() {
        await axios.delete(`https://cscg-blog-search-service.herokuapp.com/delete_research/${props.data.research_id}`)
        window.location.reload()
    }

    function handleGoBack() {
        setDeleteResearch(false);
    }

    if(!deleteResearch){
        return <div className="Research flex overflow-hidden justify-center">

            <img className="w-1/2" src={`https://api.dicebear.com/6.x/shapes/svg?shape1Color=0a5b83,1c799f,69d2e7&seed=${props.data.link}&backgroundColor=00FFAB,F2F0EB,1A6A52&shape1Color=00FFAB,F2F0EB,1A6A52&shape2Color=00FFAB,F2F0EB,1A6A52&shape3Color=00FFAB,F2F0EB,1A6A52&scale=200`} alt="logo"></img>
            <div className="text-sm p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2"> {props.data.tag} </div>
            <div className="Research_container w-1/2 pt-4 pb-4 pr-2 overflow-hidden h-full">
                <div className="flex items-center">
                    <div className="research_profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <img className="h-7" src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${props.data.name}`} alt="profile"/>

                        </div>

                    </div>
                    <h1 className="Research_information flex items-center">
                        Prof. {props.data.name}
                    </h1>
                </div>
                <div className=" Research_professor_container flex w-full justify-center items-center">
                    <div><h1 className="Blog_tittle">{props.data.title}
                    </h1></div>
                </div>

                <div className="Research_info_container ">
                    <div><h1 className="Research_information ">{props.data.information}
                    </h1></div>
                </div>
                <div className="Research_button_container space-x-3">

                     <button className="Research_button rounded-lg font-bold w-1/3 flex float-right justify-center items-center transition delay-300 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" onClick={handlePDFClick}>
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                    </button>
                    <button className="Research_button rounded-lg font-bold w-1/3  float-right flex justify-center items-center transition delay-300 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" onClick={handleInfoClick}>
                        <span className="material-symbols-outlined">open_in_new</span>
                    </button>
                    <button className="Research_Apply_button rounded-lg font-bold  flex justify-center items-center transition delay-300 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" onClick={handleApplyClick}>
                        Apply
                    </button>
                    {currentUser.isProfessor && <button onClick={handleDeleteOption} className="bg-red-500 rounded-lg p-1 text-colegio-background border border-colegio-background">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </button>
                    }

                </div>
            </div>
        </div>
    }else{

        return <div className="Research flex overflow-hidden justify-center">
            <div>
            <p className="mt-2 text-xl text-colegio-background font-bold p-2 text-center">Are you sure you want to delete this research?</p>
            <div className="flex flex-row place-items-center justify-center h-1/2">
                <button onClick={handleGoBack} className="m-2 bg-colegio-green-2 h-1/2 p-1 w-1/4 rounded-lg text-colegio-dark-green font-fold text-xl flex flex-row place-items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                    </svg>

                </button>
                <button onClick={handleDelete}  className=" h-1/2 w-1/4 m-2 bg-red-500 rounded-lg p-1 text-colegio-background border border-colegio-background flex flex-row place-items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </button>

            </div>
                </div>
         </div>
    }


}
export default Research;