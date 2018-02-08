import React, { Component } from 'react';
import axios from 'axios'
import {Link,withRouter} from 'react-router-dom';
import './add.css';

import 'carbon-components/css/carbon-components.css';
import {TextArea,TextInput,Footer,Card, Table,TableHeader, TableRow,Tab, TableData, TableHead, TableBody,Button} from 'carbon-components-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';


class AddPost extends React.Component{
    
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        
        this.state = {
            overlayTitle : "",
            overlaySubtitle : "",
            cardTitle : "",
            cardSubtitle : "",
            subject : "",
            blogDate : ""
        };
    }

    componentDidMount(){
        this.getPostWithId();
    }

    getPostWithId(){
        console.log('Inside get Post with ID');
        var id = this.props.match.params.id;
        var self = this;
        axios.post('/getPostWithId', {
          id: id
        })
        .then(function (response) {
          if(response){
            self.setState({title:response.data.title});
            self.setState({subject:response.data.subject});  
            this.props.history.push('/');
          }
        })
        .catch(function (error) {
          console.log('error is ',error);
        });
    }

    addPost(){
        var id = this.props.match.params.id;
        var self = this;
        axios.post('/addPost', {
          id : id,
          overlayTitle : this.state.overlayTitle,
          overlaySubtitle : this.state.overlaySubtitle,
          cardTitle : this.state.cardTitle,
          cardSubtitle : this.state.cardSubtitle,
          subject: this.state.subject,
          blogDate : this.state.blogDate
        })
        .then(function (response) {
          console.log('response from add post is ',response);
          self.props.history.push('/');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleOverlayTitleChange = (e) => {
        this.setState({overlayTitle : e.target.value})
    }

    handleOverlaySubtitleChange = (e) => {
        this.setState({overlaySubtitle : e.target.value})
    }

    handleCardTitleChange = (e) => {
        this.setState({cardTitle : e.target.value})
    }

    handleCardSubtitleChange = (e) => {
        this.setState({cardSubtitle : e.target.value})
    }
    
    handleSubjectChange = (e) => {
       
        this.setState({subject:e.target.value})
    }

    handleBlogDateChange = (event,date) => {
        this.setState({blogDate : date});
    }
    
    render(){
        console.log('State - ' + JSON.stringify(this.state))
        return(
            <div >

        
                <MuiThemeProvider>
                    <AppBar 
                    title="React Blog App"
                    iconElementRight={<FlatButton href = "/home" label="Home" />}
                    />
                

                <div className="form-blog">
                    
                    <TextInput
                    className="some-class"
                    id="test2"
                    labelText="Overlay Title"
                    onChange={this.handleOverlayTitleChange}
                    placeholder="Add Card Title here"
                    //value={this.state.title} 
                    required
                    />

                    <TextInput
                    className="some-class"
                    id="test2"
                    labelText="Overlay Subtitle"
                    onChange={this.handleOverlaySubtitleChange}
                    placeholder="Add Card Subtitle here"
                    //value={this.state.title} 
                    required
                    />   
                    <TextInput
                    className="some-class"
                    id="test2"
                    labelText="Card Title"
                    onChange={this.handleCardTitleChange}
                    placeholder="Add Card Title here"
                    //value={this.state.title} 
                    required
                    />

                    <TextInput
                    className="some-class"
                    id="test2"
                    labelText="Card Subtitle"
                    onChange={this.handleCardSubtitleChange}
                    placeholder="Add Card Subtitle here"
                    //value={this.state.title} 
                    required
                    />     

                    <TextArea
                    labelText="Subject"
                    className="some-class"
                    onChange={this.handleSubjectChange}
                    placeholder="Add Subject here"
                    id="test2"
                    //value={this.state.subject}
                    onChange={this.handleSubjectChange}
                    required
                    />

                    <DatePicker 
                    onChange = {this.handleBlogDateChange}
                    container="inline" />

                    <Button
                    onClick={this.addPost}
                    id="submit"
                    name="submit"
                    >
                    Add
                    </Button>

                </div>

                <div>
                <Footer className="some-class">
                        &copy; 2018 Ankit, Inc.
                    <div>
                        
                    </div>
                </Footer>
                </div>
                </MuiThemeProvider>
        </div>
        )
    }
}


export default withRouter(AddPost);