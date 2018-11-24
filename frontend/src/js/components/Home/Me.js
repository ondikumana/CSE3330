import React, { Component } from 'react'
import { Container, Segment, Button, Label, Card, Image, Icon } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from './Post'
import NewPost from './NewPost';
import SearchBar from './SearchBar'
import AdminPage from './AdminPage'
import NewPage from './NewPage';
import { HomeContext } from '../Home/HomeProvider'

const postContainer = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '50%'
}

const postHeaderStyle = {
    width: '50%',
    textAlign: 'center'
}

const newPostLabelStyle = {
    textAlign: 'center'
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
    textAlign: 'left',
    
}

const rowStyle = {
    backgroundColor: 'rgba(255, 255, 255, .2)'
}

const labelStyle = {
    marginLeft: '15px'
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
        deletingAccount: false
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

        const { deletingAccount } = this.state

        if (!deletingAccount) {
            this.setState({ deletingAccount: true })
            setTimeout( () => { this.setState({ deletingAccount: false }) }, 2000)
            return
        }

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
        const { signedInUser, posts, addingPost, addingPage, adminPages, deletingAccount } = this.state

        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { logOut, signOut, adminActive, adminActivePage } = value

                    if (!JSON.parse(localStorage.getItem('signedInUser')) || logOut) {
                        return <Redirect push to="/login" />
                    }

                    return (
                        <Container>
                            {/* <h1> Home </h1> */}

                            <Container style={container}>
                                {signedInUser &&
                                    <Container style={cardContainerStyle}>
                                        <Card raised color={'blue'} style={cardStyle}>
                                            <Image src={`https://ui-avatars.com/api/?size=512&name=${signedInUser.fname + ' ' + signedInUser.lname}`} />
                                            <Card.Content>
                                                <Card.Header>{signedInUser.fname} {signedInUser.lname}</Card.Header>
                                            </Card.Content>
                                        </Card>

                                        <Card raised color={'blue'} style={cardStyle}>
                                            <Card.Content>
                                                <b>Profile ID: </b> {signedInUser.profile_id}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Account ID: </b> {signedInUser.account_id}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Phone: </b> {signedInUser.phone}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Email: </b> {signedInUser.email}
                                            </Card.Content>
                                            <Card.Content>
                                                <b>Username: </b> {signedInUser.username}
                                            </Card.Content>
                                        </Card>
                                    </Container>
                                }

                                <Container textAlign={'center'}>
                                    {!adminActive && <Label size={'large'} color={'blue'} as={Link} to={`/messages`} >Messages</Label>}
                                    {!adminActive && <Label as={'a'} color={deletingAccount ? 'red' : 'blue'} size={'large'} style={labelStyle} onClick={() => this.deleteAccount(signedInUser)}> Delete My Profile </Label>}
                                    <Label as={Link} to={`/admin`} size={'large'} color={'grey'} style={labelStyle} >Admin View</Label>
                                    <Label as={'a'} color={'blue'} size={'large'} style={labelStyle} onClick={() => signOut()}> Log Out </Label>
                                </Container>

                                <Container textAlign={'center'} style={searchBarContainer}>
                                    <label>Search Pages/Profiles</label>
                                    <SearchBar />
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
                                            destinationId={signedInUser.account_id}
                                            doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                                            cancelNewPost={() => this.setState({ addingPost: false })} />
                                    </Container>

                                }
                                {posts && <div style={newPostLabelStyle}> <Label as={'a'} color={'blue'} size={'medium'} onClick={() => this.setState({ addingPost: true })}> {posts.length == 0 ? 'Create First Post' : 'New Post'} </Label> </div>}
                            </Container>

                            <Container style={container}>
                                {/* <div style={newPostLabelStyle}> <h3>My Pages</h3> </div>   */}
                                <br/>
                                {adminPages && adminPages.length > 0 &&
                                    adminPages.map((adminPage) => {
                                        return (
                                            <Container key={adminPage.page_id} style={postContainer} textAlign={'center'}>
                                                <AdminPage pageId={adminPage.page_id} />
                                            </Container>
                                        )
                                    })}
                                {addingPage &&
                                    <Container style={postContainer}>
                                        <NewPage
                                            doneAddingPage={() => { this.setState({ addingPage: false }); this.fetchAdminPages() }}
                                            cancelNewPage={() => this.setState({ addingPage: false })}
                                        />
                                    </Container>
                                }
                                <div style={newPostLabelStyle} > <Label as={'a'} color={'blue'} size={'medium'} style={newPostButtonStyle} onClick={() => this.setState({ addingPage: true })}> Create New Page </Label> </div>
                            </Container>

                        </Container>
                    )
                }}
            </HomeContext.Consumer>


        )
    }
}

export default Me