import React, {useEffect, useState} from 'react'
import axios from 'axios'

function DownloadLinksData(props) {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            setIsLoading(true)
            axios
            .get(`http://localhost:3001/getBook?isbnNumber=${props.isbnNumber}&title=${props.title}`)
            .then(data => {
                setData(data.data)
                setIsLoading(false)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading) {
        return(<h4>Loading...</h4>)
    }

    if( data === 'not found') {
        return (
            <div>
            Not Found!
            </div>
        )
    }

    if(data !== null) {
        const linksData = data.map(linkData => (
            <div key={linkData.id}>
                <p>
                    {linkData.title} by {linkData.author} ({<a  
                                    href={'http://gen.lib.rus.ec/book/index.php?md5=' + linkData.md5.toLowerCase()
                                    }
                >
                    {linkData.extension}
                </a>})
                </p>
    
            </div>
        ))

        return(
            <div>
                <h4>Download Links</h4>
                {linksData}
            </div>
        )
    }    

    return null
}

export default DownloadLinksData