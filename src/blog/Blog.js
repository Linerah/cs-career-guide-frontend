import Upvote from "../upvote/Upvote";
import './Blog.css'

function Blog(props) {

    const handleButtonClick = () => {
        window.open("https://" + props.data.link, '_blank');
      };

    return <div className="Blog flex overflow-hidden justify-center">
        
            <img className=" w-1/2" src="mchine.jpg" alt="logo"></img>
            <div className="Blog_container w-1/2 overflow-hidden">
                <h1 className="Blog_tittle">{props.data.title}
                </h1>
                <h2 className="Blog_information">{props.data.information} {console.log(props.data)}</h2>
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