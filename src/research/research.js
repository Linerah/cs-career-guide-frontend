import './research.css';
import Upvote from "../upvote/Upvote";



function Research(props){
    const handleInfoClick = () => {
        window.open(props.data.link, '_blank')
    }
    const handleApplyClick = () => {

    }
    // this is going to break
    const handlePDFClick = () => {
        window.open(props.data.file, '_blank')
    }
    return <div className="Research flex overflow-hidden justify-center">

            <img className="w-1/2" src={`https://api.dicebear.com/6.x/shapes/svg?shape1Color=0a5b83,1c799f,69d2e7&seed=${props.data.link}&backgroundColor=00FFAB,F2F0EB,1A6A52&shape1Color=00FFAB,F2F0EB,1A6A52&shape2Color=00FFAB,F2F0EB,1A6A52&shape3Color=00FFAB,F2F0EB,1A6A52&scale=200`} alt="logo"></img>
            <div className="p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2"> {props.data.title} </div>
            <div className="Research_container w-1/2 pt-4 pb-4 pr-2 overflow-hidden h-full">
                <div className="mr-auto Research_professor_container flex w-100 justify-center items-center">
                    <div className="profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <img className="h-7" src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${props.data.name}`} alt="profile"/>

                        </div>

                    </div>
                    <h1 className="Research_information flex items-center">
                        Prof. {props.data.name}
                    </h1>
                </div>
                <div className="Research_info_container ">
                    <div><h1 className="Research_tittle ">{props.data.information}
                    </h1></div>
                </div>
                <div className="Research_button_container space-x-3">

                     <button className="Research_button rounded-lg font-bold w-1/3 flex float-right justify-center items-center" onClick={handlePDFClick}>
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                    </button>
                    <button className="Research_button rounded-lg font-bold w-1/3  float-right flex justify-center items-center" onClick={handleInfoClick}>
                        <span className="material-symbols-outlined">open_in_new</span>
                    </button>
                    <button className="Research_Apply_button rounded-lg font-bold  flex justify-center items-center" onClick={handleApplyClick}>
                        Apply
                    </button>

                </div>
            </div>
        </div>

}
export default Research;