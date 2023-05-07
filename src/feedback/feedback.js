import Banner from "../components/banner";
import React from "react";


function Feedback(props){

    return <>
    <Banner page="feedback"></Banner>
        <div className="flex flex-col items-center justify-center h-4/5 w-full">
        <iframe scrolling="no" className=""
            src="https://docs.google.com/forms/d/e/1FAIpQLSfaWIIe701bB0ZkFGThp--Pwk8IPcZLRToEOdnnbmw1-nhgGg/viewform?embedded=true"
            width="640" height="649" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
        </iframe>
            </div>
    </>


}
export default Feedback;