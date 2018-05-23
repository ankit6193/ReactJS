import React, {Component} from 'react';
import ArtistHomePageTopCard from './ArtistHomePageTopCard';
import axios from "axios";
import AlbumCards from "./AlbumCards";

const album_search_url = "http://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=";
const artist_search_url = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";

class ArtistHomePage extends Component{

    constructor(props){
        super(props);

        this.state = {
            artist_data : "",
            albums_data : "",
            wide_image_url : "",
            artist_summary : ""
        }
    }
    componentDidMount(){
        var self = this;

        axios.get(artist_search_url + this.props.match.params.artistName)
        .then(function (response) {
            console.log(response.data.artists[0].strArtistBanner);

            self.setState({artist_data : response.data.artists[0].strBiographyEN})
            self.setState({wide_image_url : response.data.artists[0].strArtistBanner})
        })
        .catch(function (error) {
            console.log(error);
        });


        axios.get(album_search_url + this.props.match.params.artistName)
        .then(function (response) {
            console.log(response.data.album);

            self.setState({albums_data : response.data.album})
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(this.state.wide_image_url)
    }
    render(){
        return(

            <div>
                <div>
                {this.state.wide_image_url ? 
                    <ArtistHomePageTopCard imgURL = {this.state.wide_image_url} />
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