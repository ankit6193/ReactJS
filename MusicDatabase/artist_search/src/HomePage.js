import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './HomePage.css';
import axios from 'axios';
import ArtistCard from './ArtistCard';
import Button from '@material-ui/core/Button';

const artist_search_url = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";




class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchText : "",
            thumbImageURL : "",
            data : ""
        }
    }

    onSearchBarChange = (e) => {
        this.setState({searchText : e})
    }

    onSearchClicked = () => {

        var self = this;

        axios.get(artist_search_url + self.state.searchText)
        .then(function (response) {
            console.log(response);
            self.setState({data : response.data.artists})
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    render(){
        return(
            <div > 

                <div className = "container">
                    <MuiThemeProvider>
                        <SearchBar
                            onChange={(e) => this.onSearchBarChange(e)}
                            onRequestSearch={() => this.onSearchClicked() }
                            hintText = "Enter Artist Name here"
                            style={{
                                margin: '10px 10px',
                                width: 600
                            }}
                            
                        />
                    </MuiThemeProvider>

                    <Button variant="raised" color="primary" onClick ={() => this.onSearchClicked()}>
                        Search
                    </Button>
                </div>
                
                {this.state.data ? 
                    <ArtistCard data = {this.state.data}/>
                    :
                    ""
                }
                
            </div>
        )
    }
}

export default HomePage