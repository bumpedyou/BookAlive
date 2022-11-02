import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Books from "./Books";
import * as action from "./redux/actions/book";

const Card = ({ book }) => {

    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    const addedBookItems = useSelector(({book}) => book);
    const isLoggedIn = useSelector(({auth}) => auth.isLoggedIn);

    const dispatch = useDispatch();

    useEffect( () => {
        if(!isLoggedIn){
            dispatch(action.clearAddedBooItems());
        }
    }, [isLoggedIn]);

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

    const addbookBtn = {
        position: "fixed",
        top: "64%",
        right: "3%",
        borderRadius: "14px",
        width: "100px",
        height: "43px",
        padding: "5px"
    }

    return (
        <>
            {
                book.length > 0 && isLoggedIn ? (
                    <button className="btn" style={ addbookBtn }>Add BookList</button>
                ) : null
            }

            {
                book.length > 0 && isLoggedIn ? (
                    
                    book.map( ( item ) => {
                        
                        let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                        
                        if(thumbnail !== undefined)
                        {
                            return (
                                <>
                                <div id={item.id} className="card" onClick={ () => selectItem(item.id)} onDoubleClick={()=>{ setShow(true); setItem(item) }} style={{ cursor: "pointer" }}>
                                    <img src={thumbnail} alt="" />
                                    <div className="bottom">
                                        <h3 className="title">{item.volumeInfo.title}</h3>
                                    </div>
                                </div>
                                <Books show={show} item={bookItem} onClose={()=>setShow(false)}/>
                                </>
                            )
                        }
                        
                    })

                ) : null
            }

        </>
    )
}
export default Card;