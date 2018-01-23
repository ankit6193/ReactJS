import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import './home.css';

import 'carbon-components/css/carbon-components.css'
import {Footer} from 'carbon-components-react'

class ShowPost extends React.Component{
    constructor(props){
        super(props);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.state = {
            posts: []
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

    updatePost(id){
        console.log('Inside Update Post');
       // hashHistory.push('/addPost/' + id);
    }

    deletePost(id){
        // if(confirm('Do you want to delete this post ?')){
        //     var self = this;
        //     axios.post('/deletePost',{
        //         id : id
        //     })
        //     .then(function(response) {
        //         self.getPost();
        //     })
        //     .catch(function (error) {
        //         console.log('error is ',error);
        //     });
        // }
    }
    componentDidMount(){
        this.getPost();
        // document.getElementById('homeHyperlink').className = "active";
        // document.getElementById('addHyperLink').className = "";
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
                            <a href="/login" class="bx--link">Login</a>
                    </div>     
                </div>
            </div>

            <div class="header clearfix">
                <nav>
                    <ul class="nav nav-pills pull-right">
                
                        <li role="presentation"><a href="/home#/addPost">Add</a></li>
                    
                    </ul>
                </nav>
                
            </div>





            <div>
               {this.state.posts.map(function(post,index){
                  return <div class="bx--module bx--module--double">
                            <div class="bx--module__inner">
                                <div class="bx--module__header">
                                     <p class="bx--module__title bx--type-alpha"> {post.title}</p>
                                 </div>
                             <div class="bx--module__content">
                                  <p>
                                      {post.subject}
                                  </p>
                            </div>
                            </div>
                            </div>
              }.bind(this))
            }
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

export default ShowPost;