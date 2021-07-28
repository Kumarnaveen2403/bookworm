import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'

function SearchResults({match}) {
    const [searchItems, setSearchItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        if(match.params.searchTerm !== undefined) {
            setIsLoading(true)
            const url = `https://www.googleapis.com/books/v1/volumes?q=${match.params.searchTerm}&maxResults=20`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                    if(data.totalItems === 0) {
                        setIsLoading(false)
                        return(<div>Not Found!</div>)
                    }
                setSearchItems(data.items)
                setIsLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match] )


    if(isLoading) {
        return(<h4>Loading...</h4>)
    }

    if(searchItems.length !== 0) {
        const items = searchItems.map(item => 
            (
                <div key={item.id}
                    className="item-container"
                >
                    <img
                        className="small-thumbnail"
                        src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail }
                        alt={item.volumeInfo.title}
                    />
                    <h2 className="title">
                        <Link to={`/id/${item.id}`}>
                                {item.volumeInfo.title}
                        </Link>
                    </h2>
                    <p>by {item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}</p>
                    <p className="description">  {item.volumeInfo.description} </p>

                </div>
            )
        )

        return (
            <div>
                {items}
            </div>
        )
    } else  {
        return (
            <div>Not Found!</div>
        )
    }

}

export default SearchResults