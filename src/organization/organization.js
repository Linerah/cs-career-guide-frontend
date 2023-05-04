import './organization.css'


function Organization(props){
    
    const handleClick = () => {
        window.open(props.data.link,'_blank')
    }
    
    return <div className="Organization flex justify-center">
            <div className="Organization_container">
               <div className="Organization_logo rounded-full h-full" >
                   <div><img className="p-4 h-16" src={props.data.logo_url} alt={props.data.logo_name}></img></div>
                </div>
                <h1 className="Organization_tittle">{props.data.title}</h1>
            </div>
            <div className="Organization_container w-1/2">
                <h2 className="Organization_information font-bold">{props.data.info}</h2>
                <div className="Organization_button_container pt-4">
                    <button className="Organization_button rounded-lg font-bold transition delay-300 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" onClick={handleClick}>
                        Join Now!
                    </button>
                </div>
            </div>
        </div>

}
export default Organization;