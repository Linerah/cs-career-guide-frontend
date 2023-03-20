import {useNavigate} from "react-router-dom";

const Banner = ({page}) =>{
    let aiButtonClass;
    let resourcesButtonClass
    let quizButtonClass;

    switch (page){
        case 'home':
            aiButtonClass = 'Menu_button';
            resourcesButtonClass = 'Menu_button underline underline-offset-4';
            quizButtonClass = 'Menu_button';
            break;

        case 'quiz':
            aiButtonClass = 'Menu_button';
            resourcesButtonClass = 'Menu_button';
            quizButtonClass = 'Menu_button underline underline-offset-4';
            break;

        default:
            aiButtonClass = 'Menu_button';
            resourcesButtonClass = 'Menu_button';
            quizButtonClass = 'Menu_button';
    }

    const handleButtonClick = () => {

    }
    let navigate = useNavigate()
    return(
        <div className="Menu">
            <div className="flex w-1/4 space-x-6 justify-center">
                <div className= {aiButtonClass}>
                    AI
                </div>
                <div className= {resourcesButtonClass} onClick={() => navigate('/home')}>
                    Resources
                </div>
                <div className= {quizButtonClass} onClick={() => navigate('/quiz') }>
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
    )
}
export default Banner;