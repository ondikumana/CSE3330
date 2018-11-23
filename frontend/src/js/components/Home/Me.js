import React, { Component } from 'react'
import { Container, Segment, Button, Label } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from './Post'
import NewPost from './NewPost';
import SearchBar from './SearchBar';
import AdminPage from './AdminPage';
import NewPage from './NewPage';
import { HomeContext } from '../Home/HomeProvider';

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

class Me extends Component {
    state = {
        signedInUser: null,
        posts: null,
        comments: null,
        names: null,
        adminPages: null,
        logOut: false,
        addingPost: false,
        addingPage: false,
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
        localStorage.removeItem('adminActivePage')
        this.setState({ logOut: true })
    }

    deleteAccount = (signedInUser) => {

        axios.post(`${URL}/remove_account`, {
            account_id: signedInUser.account_id,
        })
            .then(() => {
                console.log('deleted')
                this.signOut()
            })
            .catch((error) => console.log(error))
    }

    fetchAdminPages = () => {
        axios.get(`${URL}/fetch_admins?profile_id=${this.state.signedInUser.profile_id}`)
            .then((databaseResponse) => {

                this.setState({ adminPages: databaseResponse.data })
            })

            .catch(e => console.log(e))
    }

    componentDidMount = () => {
        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        this.setState({ signedInUser: signedInUser }, () => { this.fetchPosts(); this.fetchAdminPages() })

    }

    render() {
        const { signedInUser, posts, addingPost, addingPage, adminPages } = this.state

        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { logOut, signOut, adminActive } = value

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
                                {!adminActive && <Label as={Link} to={`/messages`} >Messages</Label>}
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
                                        destinationId={signedInUser.account_id}
                                        style={postContainer}
                                        doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                                        cancelNewPost={() => this.setState({ addingPost: false })} />
                                }
                                {posts && <Button compact onClick={() => this.setState({ addingPost: true })}> {posts.length == 0 ? 'Create First Post' : 'New Post'} </Button>}
                            </Container>


                            <h3>My Pages</h3>

                            <Container style={container}>
                                {adminPages && adminPages.length > 0 &&
                                    adminPages.map((adminPage) => {
                                        return (
                                            <AdminPage pageId={adminPage.page_id} key={adminPage.page_id} />
                                        )
                                    })}
                                {addingPage &&
                                    <NewPage
                                        doneAddingPage={() => { this.setState({ addingPage: false }); this.fetchAdminPages() }}
                                        cancelNewPage={() => this.setState({ addingPage: false })}
                                    />
                                }
                                <Button style={newPostButtonStyle} compact onClick={() => this.setState({ addingPage: true })}> Create New Page </Button>
                            </Container>

                            <Button style={newPostButtonStyle} compact onClick={() => this.deleteAccount(signedInUser)}> Delete My Profile </Button>
                            <br />
                            <Button style={newPostButtonStyle} compact onClick={() => signOut()}> Log Out </Button>


                        </Container>
                    )
                }}
            </HomeContext.Consumer>


        )
    }
}

export default Me