import React, { Component } from 'react'
import { Container, Segment, Label, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import Post from '../Home//Post'
import NewPost from '../Home/NewPost'
import SearchBar from '../Home/SearchBar';
import { HomeContext } from '../Home/HomeProvider'
import Member from './Member'

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
        // adminActive: false,
        isSignedInUserAdmin: false,
        members: null,
        isMember: false
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
                    () => {
                        this.fetchPosts()
                        this.fetchCategory(databaseResponse.data[0].category)
                        this.fetchAdmins(page_id)
                        this.fetchMembers(page_id)
                    })
            })

            .catch(e => console.log(e))
    }

    fetchCategory = (category_id) => {
        axios.get(`${URL}/fetch_categories?category_id=${category_id}`)
            .then((databaseResponse) => this.setState({ category: databaseResponse.data[0].category_description }))

            .catch(e => console.log(e))
    }

    changeMembership = () => {
        const { signedInUser, isMember, page } = this.state

        if (isMember) {
            axios.post(`${URL}/remove_member`, {
                page_id: page.page_id,
                profile_id: signedInUser.profile_id
            })
                .then(() => {
                    console.log('removed member')
                    this.fetchMembers(page.page_id)
                })
                .catch((error) => console.log(error))
        }
        else {
            axios.post(`${URL}/create_member`, {
                page_id: page.page_id,
                profile_id: signedInUser.profile_id
            })
                .then(() => {
                    console.log('became member')
                    this.fetchMembers(page.page_id)
                })
                .catch((error) => console.log(error))
        }
    }

    fetchMembers = (page_id) => {
        const { signedInUser } = this.state
        this.setState({ isMember: false })

        axios.get(`${URL}/fetch_members?page_id=${page_id}`)
            .then((databaseResponse) => {

                const members = databaseResponse.data
                console.log(members)

                for (let i = 0; i < members.length; i++) {
                    if (members[i].profile_id == signedInUser.profile_id) {
                        this.setState({ isMember: true })
                    }
                }

                this.setState({ members: members })

            })

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

    deleteAccount = (page) => {

        axios.post(`${URL}/remove_account`, {
            account_id: page.account_id,
        })
            .then(() => {
                console.log('deleted')
                this.setState({ goingBackToMe: true })
            })
            .catch((error) => console.log(error))
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
                        break
                    }
                }
            })

    }

    render() {

        const { page, category, posts, admins, addingPost, goingBackToMe, adminActive, isSignedInUserAdmin, members, isMember } = this.state

        if (!JSON.parse(localStorage.getItem('signedInUser'))) {
            return <Redirect push to="/login" />
        }

        if (goingBackToMe) {
            return <Redirect push to="/me" />
        }

        return (
            <HomeContext.Consumer>
                {(value) => {

                    const { adminActive, adminActivePage, toggleAdminActive, signedInUser } = value

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
                                {page && !(adminActive && adminActivePage.account_id == page.account_id) && <Label as={Link} to={`/messages?recipient_id=${page.account_id}`} >Send Message</Label>}
                                {page && (adminActive && adminActivePage.account_id == page.account_id) && <Label as={Link} to={`/messages`} >Messages</Label>}
                            </Container>

                            <h3>Page Members</h3>
                            <Container style={container}>
                                {members &&
                                    members.map((member) => {
                                        return (
                                            <Member
                                                key={member.profile_id}
                                                profileId={member.profile_id}
                                                pageId={page.page_id}
                                                isSignedInUserAdmin={isSignedInUserAdmin} />
                                        )
                                    })
                                }
                                {members &&
                                    <Button style={newPostButtonStyle} compact onClick={this.changeMembership}> {isMember ? 'Leave Page' : 'Join Page' } </Button>
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
                                        destinationId={page.account_id}
                                        style={postContainer}
                                        doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                                        cancelNewPost={() => this.setState({ addingPost: false })} />
                                }
                                {page && <Button compact onClick={() => this.setState({ addingPost: true })}> Create Post on This Page </Button>}
                            </Container>

                            {isSignedInUserAdmin &&
                                <div>
                                    <Button style={newPostButtonStyle} compact onClick={() => toggleAdminActive(page)}> {adminActive ? 'Stop Being Active Admin' : 'Be Active Admin'} </Button>
                                    <br />
                                    <Button style={newPostButtonStyle} compact onClick={() => this.deleteAccount(page)}> Delete This Page </Button>
                                </div>
                            }

                            <Button style={newPostButtonStyle} compact onClick={() => this.setState({ goingBackToMe: true })}> Go Back to Me </Button>

                        </Container>
                    )
                }}
            </HomeContext.Consumer>
        )
    }
}

export default Page