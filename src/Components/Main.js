import { useState } from "react";
import Card from "./Card";
import axios from "axios";
import SaveBook from "./SaveBook";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Main = () => {
    
    const [search,setSearch] = useState("");
    const [bookData,setData] = useState([]);
    const [addStatus, setAddStatus] = useState(false);

    const isLoggedIn = useSelector(( { auth } ) => auth.isLoggedIn);

    useEffect( () => {
        if ( !isLoggedIn ) {
            setData([]);
        }
    }, [isLoggedIn] );
    
    const searchBook = (e) => {

        if( e.key === "Enter" )
        {
            if( !isLoggedIn ) {
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

    const setAddBookStatus = () => {
        setAddStatus(true);
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
                        {
                            isLoggedIn ? (
                                    <SaveBook addStatus={addStatus} />
                            ) : null
                        }

                    </div>
                    {/* <img src="images/books-background1.jpeg" alt="" /> */}
                </div>
            </div>

            <div className="container">
              {
                    <Card key="card" book={bookData} saveStatus={setAddBookStatus} />
              }  
            </div>
        </>
    )
}

export default Main;