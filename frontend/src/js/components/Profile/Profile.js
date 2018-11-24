import React, { Component } from 'react'
import { Container, Segment, Comment, Button, Label, Card, Image } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from '../Home//Post'
import NewPost from '../Home/NewPost'
import SearchBar from '../Home/SearchBar';
import { HomeContext } from '../Home/HomeProvider';

const postContainer = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '50%'
}

const container = {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '20px'
}

const searchBarContainer = {
    marginTop: '40px',
    marginBottom: '50px'
}

const newPostButtonStyle = {
    marginTop: '10px',
    marginBottom: '10px'
}

const cardContainerStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'center'
}

const cardStyle = {
    display: 'inline-block',
    marginLeft: '15px',
    marginRight: '15px',
    textAlign: 'left'
}

const labelStyle = {
    marginLeft: '15px'
}

const newPostLabelStyle = {
    textAlign: 'center'
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
            .then((databaseResponse) => this.setState({ profile: databaseResponse.data[0] }, () => this.fetchPosts()))

            .catch(e => console.log(e))
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
            <HomeContext.Consumer>
                {(value) => {
                    const { adminActivePage } = value
                    return (
                        <Container>
                            <Container style={container}>
                                {profile &&
                                    <Container style={cardContainerStyle}>
                                        <Card raised color={'blue'} style={cardStyle}>
                                            <Image src={`https://ui-avatars.com/api/?size=512&name=${profile.fname + ' ' + profile.lname}`} />
                                            <Card.Content>
                                                <Card.Header>{profile.fname} {profile.lname}</Card.Header>
                                            </Card.Content>
                                        </Card>

                                        <Card raised color={'blue'} style={cardStyle}>
                                            <Card.Content>
                                                <b>Profile ID: </b> {profile.profile_id}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Account ID: </b> {profile.account_id}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Phone: </b> {profile.phone}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Email: </b> {profile.email}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Username: </b> {profile.username}
                                            </Card.Content>
                                        </Card>
                                    </Container>
                                }

                                <Container textAlign={'center'}>
                                    {profile && <Label size={'large'} color={'blue'} as={Link} to={`/messages?recipient_id=${profile.account_id}`} >Send Message</Label>}
                                    <Label size={'large'} color={'blue'} as={'a'} style={labelStyle} onClick={() => this.setState({ goingBackToMe: true })}> Go Back to Me </Label>
                                </Container>

                                <Container textAlign={'center'} style={searchBarContainer}>
                                    <label>Search Pages/Profiles</label>
                                    <SearchBar fromProfile={true} fetchProfile={(profile_id) => this.fetchProfile(profile_id)} />
                                </Container>

                            </Container>

                            <Container style={container}>
                                {/* <h3 style={postHeaderStyle} >Posts</h3> */}
                                {posts && posts.length > 0 &&
                                    posts.map((post) => {
                                        return (
                                            <Container key={post.post_id} style={postContainer}>
                                                <Post post={post} adminActivePage={adminActivePage} />
                                            </Container>
                                        )
                                    })
                                }
                                {addingPost &&
                                    <Container style={postContainer}>
                                        <NewPost
                                            destinationId={profile.account_id}
                                            doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                                            cancelNewPost={() => this.setState({ addingPost: false })} />
                                    </Container>

                                }
                                {posts && <div style={newPostLabelStyle}> <Label as={'a'} color={'blue'} size={'medium'} onClick={() => this.setState({ addingPost: true })}> Create Post on {profile.fname.endsWith('s') ? profile.fname + "'" : profile.fname + "'s"} Profile </Label> </div>}
                            </Container>

                            {/* <Button style={newPostButtonStyle} compact onClick={this.signOut}> Log Out </Button> */}

                        </Container>
                    )
                }}
            </HomeContext.Consumer>


        )
    }
}

export default Profile