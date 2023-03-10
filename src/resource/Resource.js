import "./Resource.css"
function Resource() {

    return <>
    <div className="Menu">
        <div className="flex w-1/4 space-x-6 justify-center">
            <div className="Menu_button">
                AI
            </div>
            <div className="Menu_button underline underline-offset-4">
                Resources
            </div>
            <div className="Menu_button">
                Quiz
            </div>
        </div>
        <div className="Menu_tittle flex w-1/2 justify-center">
            <img className="h-16" src="logo_menu.png" alt="logo"/>
        </div>
        <div className="flex w-1/4 space-x-6 justify-center items-center">
            <div className="profile_gradient rounded-full p-0.5 flex justify-center items-center">
                <div className="rounded-full p-1 bg-white flex justify-center items-center">
                    <img className="h-10" src="https://api.dicebear.com/5.x/adventurer/svg?seed=KevinL" alt="profile"/>
                </div>
            </div>
            
            <div className="Menu_button">
                Logout        
            </div>  
        </div>
    </div>

    <div className="flex justify-center my-9">
        
        <div className="Divider_Tittle"> Blogs</div>
            <div className="Divider">
        </div>
    </div>
    <div className="flex space-x-6 justify-center">
        <Blog /><Blog /><Blog />
    </div>
    <div className="flex justify-center my-9">
        <div className="Divider_Tittle">Organizations</div>
            <div className="Divider">
        </div>
    </div>
    <div className="flex space-x-6 justify-center">
        <Organization /><Organization /><Organization />
    </div>
    <div className="flex justify-center my-9">
        <div className="Divider_Tittle">Research</div>
            <div className="Divider">
        </div>
    </div>
    <div className="flex space-x-6 justify-center">
        <Research /><Research /> <Research />
    </div>
    </>
}
export default Resource;

function Blog() {
    return <div className="Blog flex overflow-hidden justify-center">
        
            <img className=" w-1/2" src="mchine.jpg" alt="logo"></img>
            <div className="Blog_container w-1/2 overflow-hidden">
                <h1 className="Blog_tittle">Machine Learning
                </h1>
                <h2 className="Blog_information">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h2>
                <div className="Blog_button_container">
                    <button className="Blog_button rounded-lg font-bold">
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