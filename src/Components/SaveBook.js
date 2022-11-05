import { useEffect, useState } from "react";
import { CSVLink } from "react-csv"
import axios from "axios";
import { useSelector } from "react-redux";

export default function SaveBook({addStatus}) {
    
    const [csvFileData, setCSVFileData] = useState([]);
    const { token } = useSelector(({auth}) => auth);
    
    const style = {
        padding   : "8px",
        marginLeft: "10px"
    }
    
    useEffect( () => {
        axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/volumes?access_token=${token.access_token}`)
        .then(res=> {
            console.log(res);
            if( res.data.totalItems > 0 ) {
                
                let temp = [];

                res.data.items.map( (item) => {
                    temp.push({ 
                        Title:   item.volumeInfo.title,
                        Summary: item.volumeInfo.description.slice(0, 120) + "...",
                        Authors: item.volumeInfo.hasOwnProperty("authors") ? item.volumeInfo.authors.join(",") : "",
                        Price: item.saleInfo.hasOwnProperty('retailPrice') ? item.saleInfo.retailPrice.amount : item.saleInfo.saleability,
                        currencyCode:item.saleInfo.hasOwnProperty('retailPrice') ? item.saleInfo.retailPrice.currencyCode : "",
                        PageCount:    item.volumeInfo.pageCount,
                        PublishedDate: item.volumeInfo.publishedDate
                    })
                });

                setCSVFileData(temp);
            }
        }).catch(err=>console.log(err));
    }, [addStatus]);
    console.log(csvFileData);

    return(
        <CSVLink
            style={style}
            filename="Book List (2022-11-3)"
            className="btn btn-primary"
            data={csvFileData}
            onClick={event => {
                
                // eslint-disable-next-line no-restricted-globals
                let result = confirm("Do you want to download added Book Items?");
                
                if( csvFileData.length === 0 ){
                    alert("There is no data in your book list");
                    return false;
                }
                
                if(result){
                    axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/clearVolumes?access_token=${token.access_token}`)
                    .then( res => {
                        setCSVFileData([]);
                    });
                }

                return result;
            }}
        >
            Dump CSV File
        </CSVLink>
    )
}