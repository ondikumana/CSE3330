import React, { Component } from 'react'
import { Container, Segment, Comment, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from './Post'
import NewPost from './NewPost';
import SearchBar from './SearchBar';

const postContainer = {
    marginTop: '20px',
    marginBottom: '20px'
}

const container = {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '20px'
}

const newPostButtonStyle = {
    marginTop: '10px',
    marginBottom: '10px'
}

class Home extends Component {
    state = {
        signedInUser: null,
        posts: null,
        comments: null,
        names: null,
        logOut: false,
        addingPost: false
    }

    fetchPosts = () => {
        axios.get(`${URL}/fetch_posts?destination_id=${this.state.signedInUser.account_id}`)
            .then((databaseResponse) => {

                this.setState({ posts: databaseResponse.data })
            })

            .catch(e => console.log(e))

    }

    signOut = () => {
        localStorage.removeItem('signedInUser')
        this.setState({ logOut: true })
    }

    componentDidMount = () => {
        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        this.setState({ signedInUser: signedInUser }, () => this.fetchPosts())

    }

    render() {
        const { signedInUser, posts, logOut, addingPost } = this.state

        if (!JSON.parse(localStorage.getItem('signedInUser')) || logOut) {
            return <Redirect push to="/login" />
        }

        return (
            <Container>
                <h1> Home </h1>

                <SearchBar />
                
                <h3>My Info</h3>
                <Container style={container}>
                    {signedInUser &&
                        <Segment compact>
                            <div> <b>Profile ID: </b> {signedInUser.profile_id} </div>
                            <div> <b>First Name: </b> {signedInUser.fname} </div>
                            <div> <b>Last Name: </b> {signedInUser.lname} </div>
                            <div> <b>Phone: </b> {signedInUser.phone} </div>
                            <div> <b>Email: </b> {signedInUser.email} </div>
                            <div> <b>Username: </b> {signedInUser.username} </div>
                            <div> <b>Account ID: </b> {signedInUser.account_id} </div>
                        </Segment>
                    }
                </Container>


                <h3>Posts</h3>
                <Container style={container}>
                    {posts && posts.length > 0 &&
                        posts.map((post) => {
                            return (
                                <Container key={post.post_id} style={postContainer}>
                                    <Post post={post} />
                                </Container>
                            )
                        })
                    }
                    {addingPost && 
                        <NewPost
                            style={postContainer} 
                            doneAddingPost={ () => { this.setState({ addingPost: false }); this.fetchPosts() }} 
                            cancelNewPost={ () => this.setState({ addingPost: false }) } /> 
                    }
                    {posts && <Button compact onClick={ () => this.setState({ addingPost: true }) }> {posts.length == 0 ? 'Create First Post' : 'New Post'} </Button>}
                </Container>

                <Button style={newPostButtonStyle} compact onClick={this.signOut}> Log Out </Button>

            </Container>
        )
    }
}

export default Home