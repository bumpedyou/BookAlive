import { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Main = () => {
    
    const [search,setSearch] = useState("");
    const [bookData,setData] = useState([]);
    
    const tokenObj = localStorage.getItem("tokenObj") !=null 
                    ? JSON.parse(localStorage.getItem("tokenObj")) 
                    : null;

    const searchBook = (e) => {

        if( e.key === "Enter" )
        {
            if( tokenObj == null ){
                alert("Please user authenticate through google account");
            }
            else
            {
                //Decided to use axios to replace JSON response because I'm more familiar with this
                axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&maxResults=40')
                .then(res=>setData(res.data.items))
                .catch(err=>console.log(err))
            }
        }
    }
    
    return(
        <>
            <div className="header">
                <div className="row1">
                    <h1>Books are alive even when we close our eyes...</h1>
                </div>
                <div className="row2">
                    <h2>Search for Book</h2>
                    <div className="search">
                        <input  type="text" placeholder="Enter Your Book Name" 
                                value={search} 
                                onChange={e=>setSearch(e.target.value)} 
                                onKeyPress={searchBook}
                        />
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <img src="./images/books-background1.jpeg" alt="" />
                </div>
            </div>

            <div className="container">
              {
                    <Card book={bookData} />
              }  
            </div>
        </>
    )
}

export default Main;