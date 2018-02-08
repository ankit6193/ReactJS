import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import './home.css';

import 'carbon-components/css/carbon-components.css';
import {Footer} from 'carbon-components-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import headerImage from '../src/header.jpeg';

class ShowPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            expanded: false,
        };

        
    }

    handleClick(){
        console.log("hereeee");
    }

    getPost(){
        var self = this;
        console.log("inside get post");
        axios.post('/getPost', {

        })
        .then(function(response){
            console.log('res is ',response);
            self.setState({posts:response.data})
        })
        .catch(function (error) {
            console.log('error is ',error);
        });
    }

    componentDidMount(){
        this.getPost();
    }

  

    render(){
        return( 
           <main>
            
            <MuiThemeProvider>
                <AppBar 
                 title="React Blog App"
                 iconElementRight
                 iconElementRight={<FlatButton href = "/login" label="Login" />}
                />
            </MuiThemeProvider>

             <div>
            <div>
            
               {this.state.posts.map(function(post,index){
                  return <div>
                            <MuiThemeProvider>
                                
                                    <Card 
                                    className = 'card'
                                    >

                                    <CardHeader
                                    title="Ankit"
                                    subtitle="IBM India Software Labs Intern"
                                    avatar={headerImage}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    />
                                    <CardMedia
                                    overlay={<CardTitle title={post.overlayTitle} subtitle={post.overlaySubtitle} />}
                                    >
                                    <img src={headerImage} />
                                    
                                    </CardMedia>
                                    <CardTitle  title={post.cardTitle} subtitle={post.cardSubtitle} />
                                        <CardText expandable={true} >
                                            {post.subject}
                                        </CardText>
                                    <CardActions>
                                    <FlatButton label="Read"  />
                                    <FlatButton label={post.blogDate} />
                                    </CardActions>
                                    
                                    </Card>
                                

                                
                            </MuiThemeProvider>
                            </div>
              }.bind(this))
            }
            </div>

        </div>
        </main>
        )
    }
}

export default ShowPost;