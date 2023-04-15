import "./Search.css"
import React, {useState} from 'react';
import axios from "axios";
function Search(props) {
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

        try {
            const response = await axios.post(props.data.route, {"blog-filter": category, "blog-title": text});
            props.onBlogs(response.data);

        } catch (err) {
            console.log(err.response.data);
        }
    };

    return <>
    <div class="flex ml-8" id="search-input">
                <div  id="doctor-name">
                    <input value={text} onChange={handleChangeText} class="style:none h-7" placeholder={"Search " + props.data.resource + "..."} type="search">
                    </input>
                </div>
         
                <select value={category} onChange={handleChangeCategory} class="w-20" name="doctor-specialty" id="doctor-specialty">
                    {props.data.options.map((value) => (
                        <option value={value}>{value}</option>
                    ))}
                </select>
                <div class="rounded-full" id="submit">
                <input class="cursor-pointer rounded-r-lg font-bold Search_button" type="submit" value="Search" onClick={handleItems}>
                </input>
                </div>
            </div>
    </>
}
export default Search;