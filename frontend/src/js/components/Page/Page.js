import React, { Component } from 'react'
import { Container, Segment, Comment, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
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

class Page extends Component {
    state = {
        signedInUser: null,
        page: null,
        category: null,
        posts: null,
        comments: null,
        logOut: false,
        addingPost: false,
        goingBackToMe: false,
        adminActive: false,
        isSignedInUserAdmin: false
    }

    fetchPosts = () => {
        const { page } = this.state
        axios.get(`${URL}/fetch_posts?destination_id=${page.account_id}`)
            .then((databaseResponse) => {

                this.setState({ posts: databaseResponse.data })
            })

            .catch(e => console.log(e))

    }

    fetchPage = (page_id) => {
        this.fetchAdmins()
        axios.get(`${URL}/fetch_pages?page_id=${page_id}`)
            .then((databaseResponse) => {
                this.setState({ page: databaseResponse.data[0] },
                    () => { this.fetchPosts(); this.fetchCategory(databaseResponse.data[0].category) })
            })

            .catch(e => console.log(e))
    }

    fetchCategory = (category_id) => {
        axios.get(`${URL}/fetch_categories?category_id=${category_id}`)
            .then((databaseResponse) => this.setState({ category: databaseResponse.data[0].category_description }))

            .catch(e => console.log(e))
    }

    fetchAdmins = (page_id) => {
        const { signedInUser } = this.state

        this.setState({ isSignedInUserAdmin: false })

        axios.get(`${URL}/fetch_admins?page_id=${page_id}`)
            .then((databaseResponse) => {

                const admins = databaseResponse.data

                this.setState({ admins: admins })

                for (let i = 0; i < admins.length; i++) {
                    if (admins[i].profile_id == signedInUser.profile_id) {
                        this.setState({ isSignedInUserAdmin: true })
                        break
                    }
                }

            })

            .catch(e => console.log(e))
    }

    toggleAdminActive = () => {
        const { page, adminActive } = this.state

        if (adminActive) {
            localStorage.removeItem('adminActivePage')
            this.setState({ adminActive: false })
        }
        else {
            localStorage.setItem('adminActivePage', JSON.stringify(page))
            this.setState({ adminActive: true })
        }
    }

    componentDidMount = () => {

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        this.setState({ signedInUser: signedInUser },

            () => {
                const paramsAsString = this.props.location.search
                const query = paramsAsString.substring(1, paramsAsString.length)
                const queryArr = query.split('&')
                const queryArrLength = queryArr.length

                for (let i = 0; i < queryArrLength; i++) {
                    if (queryArr[i].includes('page_id')) {
                        const pageIdArr = queryArr[i].split('=')
                        this.fetchPage(pageIdArr[1])
                        this.fetchAdmins(pageIdArr[1])
                        break
                    }
                }
            })

    }

    componentWillUnmount = () => {
        localStorage.removeItem('adminActivePage')
    }

    render() {

        const { page, category, posts, admins, logOut, addingPost, goingBackToMe, adminActive, isSignedInUserAdmin } = this.state

        if (!JSON.parse(localStorage.getItem('signedInUser')) || logOut) {
            return <Redirect push to="/login" />
        }

        if (goingBackToMe) {
            return <Redirect push to="/home" />
        }

        return (
            <Container>
                <h1> Page </h1>

                <SearchBar fromPage={true} fetchPage={(page_id) => this.fetchPage(page_id)} />

                <h3>Page Info</h3>
                <Container style={container}>
                    {page &&
                        <Segment compact>
                            <div> <b>Page ID: </b> {page.page_id} </div>
                            <div> <b>Page Name: </b> {page.page_name} </div>
                            {category && <div> <b>Category: </b> {category} </div>}
                            <div> <b>Description: </b> {page.description} </div>
                        </Segment>
                    }
                </Container>

                <h3>Posts</h3>
                <Container style={container}>
                    {posts && posts.length > 0 &&
                        posts.map((post) => {
                            return (
                                <Container key={post.post_id} style={postContainer}>
                                    <Post post={post} adminActive={adminActive} />
                                </Container>
                            )
                        })
                    }
                    {addingPost &&
                        <NewPost
                            adminActive={adminActive}
                            destinationId={page.account_id}
                            style={postContainer}
                            doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                            cancelNewPost={() => this.setState({ addingPost: false })} />
                    }
                    {page && <Button compact onClick={() => this.setState({ addingPost: true })}> Create Post on This Page </Button>}
                </Container>

                {isSignedInUserAdmin &&
                    <div>
                        <Button style={newPostButtonStyle} compact onClick={this.toggleAdminActive}> {adminActive ? 'Stop Being Active Admin' : 'Be Active Admin'} </Button>
                    </div>
                }

                <Button style={newPostButtonStyle} compact onClick={() => this.setState({ goingBackToMe: true })}> Go Back to Me </Button>



            </Container>
        )
    }
}

export default Page