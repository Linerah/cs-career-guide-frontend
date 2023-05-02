import './research.css';



function Research(props){
    const handleInfoClick = () => {
        window.open(props.data.link, '_blank')
    }
    const handleApplyClick = () => {

    }

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

    return <div className="Research flex overflow-hidden justify-center">
            <div className="Research_container">
               <div className="Research_logo rounded-full h-full" >
                    <img className={"p-4 w-24 h-24 rounded-full"} src={`https://api.dicebear.com/6.x/shapes/svg?seed=${props.data.title}`} alt="avatar"/>
                </div>
                <h1 className="Research_title"> {props.data.title} </h1>
            </div>
            <div className="Research_container w-1/2">
                <h2 className="Research_information font-bold"> {props.data.information} </h2>
                <div className="Research_button_container pt-4">
                    <button className="Research_button rounded-lg font-bold" onClick={handlePDFClick}>
                        <span className="material-symbols-outlined">
picture_as_pdf
</span>
                    </button>
                    <button className="Research_button rounded-lg font-bold" onClick={handleApplyClick}>
                        Apply Now!
                    </button>
                    <button className="Research_button rounded-lg font-bold" onClick={handleInfoClick}>
                        <span className="material-symbols-outlined">
open_in_new
</span>
                    </button>
                </div>
            </div>
        </div>

}
export default Research;