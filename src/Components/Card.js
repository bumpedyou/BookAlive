import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Books from "./Books";
import * as action from "./redux/actions/book";

const Card = ({ book, saveStatus }) => {

    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    const addedBookItems = useSelector(({book}) => book);
    const { isLoggedIn, token } = useSelector(({auth}) => auth);

    const dispatch = useDispatch();

    useEffect( () => {
        if(!isLoggedIn){
            dispatch(action.clearAddedBooItems());
        }

    }, [isLoggedIn]);

    // This function is to select books user wants
    const selectItem = (volumeId) =>{

        dispatch(action.addBook(volumeId));

        const isExistItem = addedBookItems.find((item, i) => item === volumeId);
        const $clickedItem = document.getElementById(volumeId);

        if(isExistItem){
            $clickedItem.style.backgroundColor = "white";
        }else{
            $clickedItem.style.backgroundColor = "burlywood";
        }
    }

    const storeBookItems = () => {
        
        //const token = "ya29.a0Aa4xrXP0CWTgOt-0i5Jgl-QwPB6izzZmCFS5eeJJdwQc2OJUuRJbVkyrxZZvsPaCP1tsVS6930m-_ea0_mO8rzrzSmewZ6h9HSRkWZ0Mz3Y3FXoHdtIJX2VY22gOReCDljDmIXG9OtRY4es9up29ndxTO7qraCgYKAcQSARESFQEjDvL9gwAUSrX3Xc6553nY4pl6cQ0163";

        if(addedBookItems.length > 0){
            addedBookItems.map( (volumeId, i) => {
                axios.post(`https://books.googleapis.com/books/v1/mylibrary/bookshelves/4/addVolume?access_token=${token.access_token}&volumeId=${volumeId}`, {})
                .then( (res) => { console.log(res) });
            });

            book.map((item) => {
                document.getElementById(item.id).style.backgroundColor = "white";
            });

            dispatch(action.clearAddedBooItems());
            saveStatus();

            alert("The selected book items are stored in your booklist successfully!");
        } else {

            alert("Pease select book items you want see!");
            
        }
   
    }

    const addbookBtn = {
        position: "fixed",
        top: "64%",
        right: "3%",
        width: "100px",
        height: "43px",
        padding: "5px"
    }

    return (
        <>
            {
                book.length > 0 && isLoggedIn ? (
                    <button className="btn" style={ addbookBtn } onClick={storeBookItems} >Add BookList</button>
                ) : null
            }

            {
                book.length > 0 && isLoggedIn ? (
                    
                    book.map( ( item, i ) => {
                        
                        let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                        
                        if(thumbnail !== undefined)
                        {
                            return (
                                <div key={`item-key-${i}`}>
                                    <div  id={item.id} className="card" onClick={ () => selectItem(item.id)} onDoubleClick={()=>{ setShow(true); setItem(item) }} style={{ cursor: "pointer" }}>
                                        <img src={thumbnail} alt="" />
                                        <div className="bottom">
                                            <h3 className="title">{item.volumeInfo.title}</h3>
                                        </div>
                                    </div>
                                    <Books show={show} item={bookItem} onClose={()=>setShow(false)}/>
                                </div>
                            )
                        }
                        
                    })

                ) : null
            }

        </>
    )
}
export default Card;