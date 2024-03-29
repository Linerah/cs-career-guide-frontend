import "./Search.css"
import React, {useState, useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../auth/AuthContext";
function Search(props) {
    
    const {currentUser} = useContext((AuthContext))
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    

    const handleChangeText = (event) => {
        const value = event.target.value;
        setText(value);
        console.log(text)
    };

    const handleChangeCategory = (event) => {
        const value = event.target.value;
        setCategory(value);
    };


    const handleItems = async (e) => {
        e.preventDefault();
        let resource = props.data.resource;
        try {
            if (resource === "blogs"){
                const response = await axios.post(props.data.route, {"blog-filter": category, "blog-title": text, "user_id": currentUser._id});
            props.onSection(response.data);
            }
            else if(resource === "research"){
                const response = await axios.post(props.data.route, {"research-filter": category, "research-title": text, "user_id": currentUser._id});
            props.onSection(response.data);
            }
            else if(resource === "organization"){
                const response = await axios.get(props.data.route)
                props.onSection(response.data);
            }


        } catch (err) {
            console.log(err.response.data);
        }
    };

    if (props.data.resource !== "organization"){
        return <>
    <div class="flex ml-8" id="search-input">
                <div  id="doctor-name">
                    <input value={text} onChange={handleChangeText} class="style:none h-7 w-36 Text_Search" placeholder={"Search " + props.data.resource + "..."} type="search">
                    </input>
                </div>

                <select value={category} onChange={handleChangeCategory} class="w-20 Dropdown_Search ">
                    {props.data.options.map((value) => (
                        <option value={value}>{value}</option>
                    ))}
                </select>
            <div className="rounded-full" id="submit" onClick={handleItems}>
                 <div className="cursor-pointer rounded-r-lg font-bold Search_button flex justify-center items-center">
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
            </div>
    </>
    }
    return <>
    </>
}
export default Search;