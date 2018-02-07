import React, { Component } from 'react';
import axios from 'axios'
import {Link,withRouter} from 'react-router-dom';
import './edit.css';

import 'carbon-components/css/carbon-components.css';
import {Footer,Card, Table,TableHeader, TableRow,Tab, TableData, TableHead, TableBody,Button} from 'carbon-components-react';

class EditPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount(){
        this.getPost();
        // document.getElementById('homeHyperlink').className = "active";
        // document.getElementById('addHyperLink').className = "";
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

    updatePost(id){
        console.log('Inside Update Post');
        this.props.history.push('/addPost/'+id);
    }

    deletePost(id){
        //if(confirm('Do you want to delete this post ?')){
            var self = this;
            axios.post('/deletePost',{
                id : id
            })
            .then(function(response) {
                self.getPost();
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
      //  }
    }

    render(){
        return( 
            
             <div class="container">

        
            <div class="bx--tile">
                <div class= "head--title">
                    <div class="left--title">
                        React Blog App
                    </div>
                    <div class="right--title">
                            <a href="/addpost" class="bx--link">Add Post</a>
                    </div>     
                </div>
            </div>


            <div>
                <Table>
                <TableHead>
                <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Subject</TableHeader>
                    <TableHeader>#</TableHeader>
                    <TableHeader>#</TableHeader>
                </TableRow>
                </TableHead>
                <TableBody>
               {this.state.posts.map(function(post,index){
                  return <TableRow key={index} >
                            <TableData> {index+1} </TableData>
                            <TableData> {post.title} </TableData>
                            <TableData> {post.subject} </TableData>
                            <TableData><Button onClick={this.updatePost.bind(this,post._id)}> Edit </Button></TableData>
                            <TableData><Button onClick={this.deletePost.bind(this,post._id)}> Delete </Button></TableData>
                        </TableRow>
              }.bind(this))
            }
            </TableBody>
            </Table>
            </div>
            
            <div>
            <Footer className="some-class">
                    &copy; 2018 Ankit, Inc.
            </Footer>
            </div>

        </div>
        )
    }
}

export default withRouter(EditPost)