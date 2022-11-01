import react from "react";
import { useState } from "react/cjs/react.development";
import Books from "./Books";
const Card = ({ book }) => {

    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    console.log(book)
    return (
        <>
            {
                book.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    if(thumbnail!= undefined)
                    {
                        return (
                            <>
                            <div className="card" onClick={()=>{setShow(true);setItem(item)}}>
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
            }

        </>
    )
}
export default Card;