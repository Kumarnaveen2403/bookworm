import React from 'react'
import ItemDetail from './ItemDetail'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
    return(
        <div>
            <Router>
                <SearchForm/>
                <Switch>
                    <Route path="/:searchTerm" exact component={SearchResults}/>
                    <Route path="/id/:id" exact component={ItemDetail} />
                </Switch>
            </Router>
        </div>
    )
}
export default App