import React, { Component } from 'react'
import { Container, Segment, Label, Button, Card, Image, Input, Form, TextArea } from 'semantic-ui-react'
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
    marginBottom: '20px',
    width: '50%'
}

const container = {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '20px'
}

const membersHeaderContainer = {
    marginTop: '20px',
    marginBottom: '20px',
}

const newPostButtonStyle = {
    marginTop: '10px',
    marginBottom: '10px'
}

const searchBarContainer = {
    marginTop: '40px',
    marginBottom: '30px'
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
        isMember: false,
        deletingAccount: false,
        showMembers: false,
        editMode: false,
        newName: '',
        newDescription: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updatePage = () => {
        const { page, newName, newDescription, editMode } = this.state
        console.log(page.page_id)

        if (!editMode) {
            this.setState({ editMode: true })
            return
        }

        if (page.page_name == newName && page.description == newDescription) {
            this.setState({ editMode: false })
            return
        }

        axios.post(`${URL}/update_page`, {
            page_id: page.page_id,
            page_name: page.page_name == newName ? null : newName,
            description: page.description == newDescription ? null : newDescription,
        })
            .then((databaseResponse) => {

                console.log('page updated')
                this.setState({ editMode: false })
                this.fetchPage(page.page_id)

            })
            .catch((error) => console.log(error))
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
                this.setState({ 
                    page: databaseResponse.data[0], 
                    newName: databaseResponse.data[0].page_name,
                    newDescription: databaseResponse.data[0].description
                 },
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

        const { deletingAccount } = this.state

        if (!deletingAccount) {
            this.setState({ deletingAccount: true })
            setTimeout(() => { this.setState({ deletingAccount: false }) }, 2000)
            return
        }

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

        const {
            page,
            category,
            posts,
            admins,
            addingPost,
            goingBackToMe,
            adminActive,
            isSignedInUserAdmin,
            members,
            isMember,
            deletingAccount,
            showMembers,
            editMode,
            newName,
            newDescription } = this.state

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
                            {/* <h1> Page </h1> */}

                            <Container style={container}>
                                {page &&
                                    <Container style={cardContainerStyle}>
                                        <Card raised color={'blue'} style={cardStyle}>
                                            <Image src={`https://ui-avatars.com/api/?size=512&name=${page.page_name}`} />
                                            <Card.Content>
                                                {editMode ?
                                                    <Card.Header>

                                                        <Input
                                                            name={'newName'}
                                                            type={'text'}
                                                            value={newName}
                                                            onChange={this.handleInputChange} />

                                                    </Card.Header>
                                                    :
                                                    <Card.Header>{page.page_name}</Card.Header>
                                                }

                                            </Card.Content>
                                        </Card>

                                        <Card raised color={'blue'} style={cardStyle}>
                                            {isSignedInUserAdmin && adminActive && <Label style={newPostLabelStyle} attached={'top'} as={'a'} color={editMode ? 'green' : 'blue'} onClick={this.updatePage} >{editMode ? 'Update' : 'Edit'}</Label>}
                                            {category && <Card.Content> <div> {category} </div> </Card.Content>}
                                            <Card.Content>
                                                {editMode ?
                                                    <Card.Description>
                                                        
                                                        <Form>
                                                            <TextArea
                                                                autoHeight
                                                                value={newDescription}
                                                                name={'newDescription'}
                                                                onChange={e => this.handleInputChange(e)} />
                                                        </Form>

                                                    </Card.Description>
                                                    :
                                                    <Card.Description>{page.description}</Card.Description>
                                                }
                                            </Card.Content>
                                        </Card>
                                    </Container>
                                }

                                <Container textAlign={'center'}>

                                    {page && !(adminActive && adminActivePage.account_id == page.account_id) && <Label color={'blue'} size={'large'} style={labelStyle} as={Link} to={`/messages?recipient_id=${page.account_id}`} >Send Message</Label>}
                                    {page && (adminActive && adminActivePage.account_id == page.account_id) && <Label color={'blue'} size={'large'} style={labelStyle} as={Link} to={`/messages`} >Messages</Label>}

                                    {isSignedInUserAdmin && <Label as={'a'} color={adminActive ? 'green' : 'blue'} size={'large'} style={labelStyle} onClick={() => toggleAdminActive(page)}> {adminActive ? 'Stop Being Active Admin' : 'Be Active Admin'} </Label>}
                                    {isSignedInUserAdmin && adminActive && <Label as={'a'} color={deletingAccount ? 'red' : 'blue'} size={'large'} style={labelStyle} onClick={() => this.deleteAccount(page)}> Delete This Page </Label>}

                                    {members && <Label as={'a'} color={'blue'} size={'large'} style={labelStyle} onClick={this.changeMembership}> {isMember ? 'Leave Page' : 'Join Page'} </Label>}
                                    <Label as={'a'} color={'blue'} size={'large'} style={labelStyle} onClick={() => this.setState({ goingBackToMe: true })}> Go Back to Me </Label>

                                </Container>

                                <Container textAlign={'center'} style={searchBarContainer}>
                                    <label>Search Pages/Profiles</label>
                                    <SearchBar fromPage={true} fetchPage={(page_id) => this.fetchPage(page_id)} />
                                </Container>

                                <Container textAlign={'center'} style={membersHeaderContainer} >
                                    <Label as={'a'} color={'blue'} size={'medium'} onClick={() => this.setState({ showMembers: !showMembers })} > {showMembers ? 'Hide Members' : 'Show Members'} </Label>
                                </Container>

                                <Container textAlign={'center'}>
                                    {members && showMembers &&
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
                                </Container>

                            </Container>

                            <Container style={container}>
                                {/* <h3 style={postHeaderStyle} >Posts</h3> */}
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
                                    <Container style={postContainer}>
                                        <NewPost
                                            destinationId={page.account_id}
                                            doneAddingPost={() => { this.setState({ addingPost: false }); this.fetchPosts() }}
                                            cancelNewPost={() => this.setState({ addingPost: false })} />
                                    </Container>

                                }
                                {posts && <div style={newPostLabelStyle}> <Label as={'a'} color={'blue'} size={'medium'} onClick={() => this.setState({ addingPost: true })}> Create Post on This Page </Label> </div>}
                            </Container>

                        </Container>
                    )
                }}
            </HomeContext.Consumer>
        )
    }
}

export default Page