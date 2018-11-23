import React, { Component } from 'react'
import { Container, Segment, Comment, Button, Label } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from '../Home//Post'
import NewPost from '../Home/NewPost'
import SearchBar from '../Home/SearchBar';

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

class Profile extends Component {
    state = {
        signedInUser: null,
        profile: null,
        posts: null,
        comments: null,
        names: null,
        logOut: false,
        addingPost: false,
        goingBackToMe: false
    }

    fetchPosts = () => {
        axios.get(`${URL}/fetch_posts?destination_id=${this.state.profile.account_id}`)
            .then((databaseResponse) => {

                this.setState({ posts: databaseResponse.data })
            })

            .catch(e => console.log(e))

    }

    // signOut = () => {
    //     localStorage.removeItem('signedInUser')
    //     this.setState({ logOut: true })
    // }

    fetchProfile = (profile_id) => {
        axios.get(`${URL}/fetch_profiles?profile_id=${profile_id}`)
            .then( (databaseResponse) => this.setState({ profile: databaseResponse.data[0] }, () => this.fetchPosts() ) )

            .catch( e => console.log(e) )
    }

    componentDidMount = () => {

        const paramsAsString = this.props.location.search
        const query = paramsAsString.substring(1, paramsAsString.length)
        const queryArr = query.split('&')
        const queryArrLength = queryArr.length

        for (let i = 0; i < queryArrLength; i++) {
            if (queryArr[i].includes('profile_id')) {
                const profileIdArr = queryArr[i].split('=')
                this.fetchProfile(profileIdArr[1])
                break
            }
        }

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        this.setState({ signedInUser: signedInUser })
    }

    render() {
        const { profile, posts, logOut, addingPost, goingBackToMe } = this.state

        if (!JSON.parse(localStorage.getItem('signedInUser')) || logOut) {
            return <Redirect push to="/login" />
        }

        if (goingBackToMe) {
            return <Redirect push to="/me" />
        }

        return (
            <Container>
                <h1> Profile </h1>

                <SearchBar fromProfile={true} fetchProfile={ (profile_id) => this.fetchProfile(profile_id) }/>

                <h3>Profile Info</h3>
                <Container style={container}>
                    {profile &&
                        <Segment compact>
                            <div> <b>Profile ID: </b> {profile.profile_id} </div>
                            <div> <b>First Name: </b> {profile.fname} </div>
                            <div> <b>Last Name: </b> {profile.lname} </div>
                            <div> <b>Phone: </b> {profile.phone} </div>
                            <div> <b>Email: </b> {profile.email} </div>
                            <div> <b>Username: </b> {profile.username} </div>
                            <div> <b>Account ID: </b> {profile.account_id} </div>
                        </Segment>
                    }
                    {profile && <Label as={Link} to={`/messages?recipient_id=${profile.account_id}`} >Send Message</Label>}
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
                            destinationId={profile.account_id}
                            style={postContainer}
                            doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                            cancelNewPost={() => this.setState({ addingPost: false })} />
                    }
                    {profile && <Button compact onClick={() => this.setState({ addingPost: true })}> Create Post on {profile.fname.endsWith('s') ? profile.fname + "'" : profile.fname + "'s"} Profile </Button>}
                </Container>

                <Button style={newPostButtonStyle} compact onClick={ () => this.setState({ goingBackToMe: true })}> Go Back to Me </Button>

                {/* <Button style={newPostButtonStyle} compact onClick={this.signOut}> Log Out </Button> */}

            </Container>
        )
    }
}

export default Profile