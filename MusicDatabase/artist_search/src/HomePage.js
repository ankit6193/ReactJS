// Landing Page of the app is HomePage component


import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './HomePage.css';
import axios from 'axios';
import ArtistCard from './ArtistCard';
import Button from '@material-ui/core/Button';
import ButtonAppBar from './ConstantFunctions/AppBar';
import config from './ConstantFunctions/config';


// It calls Artist Card component if search results are there

class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchText : "",
            thumbImageURL : "",
            data : "",
            message : "If matched search Results will show up here"
        }
    }

    //handle change in searchbar

    onSearchBarChange = (e) => {
        this.setState({searchText : e})
    }

    // making api call when user ENTER or Clicks

    onSearchClicked = () => {

        var self = this;
        self.setState({data : ""})
        axios.get(config.artist_search_url + self.state.searchText)
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
                <ButtonAppBar />
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

                    <div className = "error">
                        {this.state.message}
                    </div>
                }
                
            </div>
        )
    }
}

export default HomePage