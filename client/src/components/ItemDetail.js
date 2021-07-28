import React, {useEffect, useState} from 'react'
import DownloadLinks from './DownloadLinks'

function ItemDetail({match}) {

    const [itemData, setItemData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const url = `https://www.googleapis.com/books/v1/volumes/${match.params.id}`

        async function fetchData() {
            setIsLoading(true)
            const response = await fetch(url)
            if(!response.ok){
                return <div>Not Found!</div>
            }
            const data = await response.json()
            setItemData(data)
            setIsLoading(false)
        }

        fetchData()
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    if ( isLoading ) {
        return(<h4>Loading...</h4>)
      }
    
    if(itemData !== null ){
        return (
            <div>
                <img 
                    className="large-thumbnail" 
                    src={itemData.volumeInfo.imageLinks && itemData.volumeInfo.imageLinks.smallThumbnail}
                    alt={itemData.volumeInfo.title}
                />
                
                <h2 className="title">
                    {itemData.volumeInfo.title}
                </h2>
    
                <h4>Written by {itemData.volumeInfo.authors.join(', ')}</h4>
                <h4>Published by {itemData.volumeInfo.publisher}</h4>
                <p className="description">  {itemData.volumeInfo.description && itemData.volumeInfo.description.replace(/<[^>]+>/g, '') } </p>
                
                <h4>Categories:</h4>
                <p>{itemData.volumeInfo.categories || "No Categories"}</p>

                <p>ISBN 10 : {itemData.volumeInfo.industryIdentifiers ? itemData.volumeInfo.industryIdentifiers[0].identifier : "Not Found"}</p>
                <p>ISBN 13 : {itemData.volumeInfo.industryIdentifiers ? itemData.volumeInfo.industryIdentifiers[1].identifier : "Not Found"}</p>
                
    
                <DownloadLinks 
                    title={itemData.volumeInfo.title} 
                    isbnNumber={itemData.volumeInfo.industryIdentifiers ? itemData.volumeInfo.industryIdentifiers[1].identifier : "Not Found"}
                />

<a 
                    href={`http://libgen.rs/search.php?&req=${itemData.volumeInfo.title.replace(/\s/g, '+')}&phrase=1&view=simple&column=def&sort=publisher&sortmode=ASC`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Library Genesis Link
                </a>
            </div>
        )
    } else {
        return null
    }

}

export default ItemDetail