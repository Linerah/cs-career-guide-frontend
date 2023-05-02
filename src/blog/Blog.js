
import Upvote from "../upvote/Upvote";
import './Blog.css'

function Blog(props) {

    const handleButtonClick = () => {
        window.open(props.data.link, '_blank');
      };

    return <div className="Blog flex overflow-hidden justify-center">

            <img className=" w-1/2" src="mchine.jpg" alt="logo"></img>
            <div className="p-1 text-center rounded-bl-sm absolute start-0 bottom-0 bg-colegio-green text-colegio-background font-sans font-bold w-1/2"> {props.data.tag} </div>
            <div className="Blog_container w-1/2 overflow-hidden">
                <div className="Blog_professor_container flex w-100 justify-center items-center">
                    <div className="profile_gradient mr-auto rounded-full p-0.5 flex justify-center items-center">
                        <div className="rounded-full p-0.2 bg-white flex justify-center items-center">
                            <img className="h-10" src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${props.data.name}`} alt="profile"/>

                        </div>

                    </div>
                    <h1 className="Blog_information flex items-center">
                        Prof. {props.data.name}
                    </h1>
                </div>
                <div className="Blog_info_container ">
                    <div><h1 className="Blog_tittle">{props.data.title}
                    </h1></div>
                    <div><h2 className="Blog_information">{props.data.information}</h2></div>
                </div>
                <div className="Blog_button_container space-x-3">
                    <Upvote  key={`${props.data.blog_id}_${props.data.upvote}`} data={{blog_id: props.data.blog_id, upvote: props.data.upvote}}/>
                    <button className="Blog_button rounded-lg font-bold" onClick={handleButtonClick}>
                        Read
                    </button>
                </div>
            </div>
        </div>
}
export default Blog;