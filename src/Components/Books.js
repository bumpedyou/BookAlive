
const BookList=({show,item,onClose})=>{

    if(!show)
    {
        return null;
    }

    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    
    return(
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <h3>Authors: {item.volumeInfo.authors[0]}</h3>
                            <h4>Average Rating: {item.volumeInfo.averageRating}</h4>
                            <h5>Pages: {item.volumeInfo.pageCount}</h5>
                            <h5>Publisher: {item.volumeInfo.publisher}</h5>
                            <h5>Publication Date: {item.volumeInfo.publishedDate}</h5><br/>
                            <a href={item.volumeInfo.previewLink}><button>More</button></a>
                        </div>
                    </div>
                    <h4 className="description">{ item.volumeInfo.description }</h4>
                </div>
            </div>
        </>
    )
}
export default BookList;