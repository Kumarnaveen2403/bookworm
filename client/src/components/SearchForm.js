import React from 'react'
import {Link, withRouter} from 'react-router-dom'

class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm : '',
            searchItems : [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.history.push(`/${this.state.searchTerm}`)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name] : value})
    }

    render() {
        return(

            <div>
                <form onSubmit={this.handleSubmit}>
                        <Link to="/">
                            <h2 className="search-label">Search a book</h2>
                        </Link>

                        <input
                            type="texts"
                            name="searchTerm"
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            className="search-input"
                        />

                        <button type="submit" className="search-button">
                            <Link to={`/${this.state.searchTerm}`} >
                                Search!
                            </Link>
                        </button>

                </form>

            </div>
        )
    }
}


export default withRouter((SearchForm))
// export default SearchForm