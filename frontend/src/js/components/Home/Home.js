import React, { Component } from 'react'
import { Container, Segment, Comment, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from './Post'

class Home extends Component {
    state = {
        signedInUser: null,
        posts: null,
        comments: null,
        names: null,
        logOut: false
    }

    fetchPosts = () => {
        axios.get(`${URL}/fetch_posts?author_id=${this.state.signedInUser.account_id}`)
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
        const { signedInUser, posts, comments, logOut, names } = this.state

        if (!JSON.parse(localStorage.getItem('signedInUser')) || logOut) {
            return <Redirect push to="/login" />
        }

        return (
            <Container>
                <h1> Home </h1>

                <h3>Your Info</h3>
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

                <h3>Posts</h3>
                {posts && posts.length > 0 &&
                    posts.map((post) => {
                        return (
                            <Container key={post.post_id}>
                                <Post post={post} />

                            </Container>
                        )
                    })
                }

                <Button onClick={this.signOut}> Log Out </Button>

            </Container>
        )
    }
}

export default Home