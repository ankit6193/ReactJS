// After selecting view albums in main page . This will be called

import React, {Component} from 'react';
import ArtistHomePageTopCard from './ArtistHomePageTopCard';
import axios from "axios";
import AlbumCards from "./AlbumCards";
import ButtonAppBar from './ConstantFunctions/AppBar';
import config from './ConstantFunctions/config'

class ArtistHomePage extends Component{

    constructor(props){
        super(props);

        this.state = {
            artist_data : "",
            albums_data : "",
            wide_image_url : "",
            artist_summary : "",
            followers : "",
            genre : "",
            name : ""
        }
    }

    // API call is bieng made in componentDidMount to handle repeated or missed API call

    componentDidMount(){
        var self = this;


        //gets artist details

        axios.get(config.artist_search_url + this.props.match.params.artistName)
        .then(function (response) {
            //console.log(response);

            self.setState({artist_data : response.data.artists[0].strBiographyEN})
            self.setState({wide_image_url : response.data.artists[0].strArtistThumb})
            self.setState({followers : response})
            self.setState({genre : response.data.artists[0].strGenre})
            self.setState({name : response.data.artists[0].strArtist})
        })
        .catch(function (error) {
            console.log(error);
        });

        //gets artist's albums
        axios.get(config.album_search_url + this.props.match.params.artistName)
        .then(function (response) {
            //console.log(response.data.album);
            self.setState({albums_data : response.data.album})
        })
        .catch(function (error) {
            console.log(error);
        });

        //console.log(this.state.wide_image_url)
    }
    
    render(){
        return(

            <div>
                <ButtonAppBar/>
                <div>
                {this.state.wide_image_url ? 
                    <ArtistHomePageTopCard imgURL = {this.state.wide_image_url} genre = {this.state.genre} name = {this.state.name} followers = {this.state.followers}/>
                    :
                    ""
                }
                    
                </div>
                <div>
                {
                    this.state.albums_data? 
                     <AlbumCards data = {this.state.albums_data}/>
                     :
                     ""
                }
                   
                </div>
            </div>


        )
    }
}

export default ArtistHomePage