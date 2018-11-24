import React, { Component } from 'react'
import { Container, Label } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { Link } from 'react-router-dom'

const container = {
    width: '50%',
    paddingTop: '100px'
}

const subContainer = {
    marginTop: '20px',
    marginBottom: '20px'
}

const labelStyle = {
    display: 'inline-block',
    margin: '10px'
}

class Admin extends Component {
    state = {
        profiles: null,
        pages: null,
        categories: null,
        comments: null,
        posts: null,
    }

    fetchProfiles = () => {
        axios.get(`${URL}/fetch_profiles`)
            .then((databaseResponse) => this.setState({ profiles: databaseResponse.data }))

            .catch(e => console.log(e))
    }

    fetchPages = () => {
        axios.get(`${URL}/fetch_pages`)
            .then((databaseResponse) => this.setState({ pages: databaseResponse.data }))

            .catch(e => console.log(e))
    }

    fetchCategories = () => {
        axios.get(`${URL}/fetch_categories`)
            .then((databaseResponse) => this.setState({ categories: databaseResponse.data }))

            .catch(e => console.log(e))
    }

    fetchComments = () => {
        axios.get(`${URL}/fetch_comments`)
            .then((databaseResponse) => this.setState({ comments: databaseResponse.data }))

            .catch(e => console.log(e))
    }

    fetchPosts = () => {
        axios.get(`${URL}/fetch_posts`)
            .then((databaseResponse) => this.setState({ posts: databaseResponse.data }))

            .catch(e => console.log(e))
    }

    componentDidMount = () => {
        this.fetchProfiles()
        this.fetchPages()
        this.fetchCategories()
        this.fetchComments()
        this.fetchPosts()
    }

    render() {

        const { profiles, showProfiles, pages, showPages, categories, showCategories, comments, showComments, posts, showPosts } = this.state

        return (
            <Container style={container}>
                <Container style={subContainer}>
                    {profiles &&
                        <Label
                            as={'a'}
                            color={'blue'}
                            size={'large'}
                            onClick={() => this.setState({ showProfiles: !showProfiles })}>
                            {!showProfiles ? 'Show' : 'Hide'} Profiles
                            <Label.Detail>
                                {profiles.length}
                            </Label.Detail>
                        </Label>}
                    <Container>
                        {profiles && showProfiles &&
                            profiles.map((profile) => {
                                return (
                                    <Label
                                        style={labelStyle}
                                        key={profile.profile_id}
                                        as={Link}
                                        to={`/profile?profile_id=${profile.profile_id}`}>
                                        {profile.fname} {profile.lname}
                                    </Label>
                                )
                            })
                        }
                    </Container>
                </Container>

                <Container style={subContainer}>
                    {pages &&
                        <Label
                            as={'a'}
                            color={'blue'}
                            size={'large'}
                            onClick={() => this.setState({ showPages: !showPages })} >
                            {!showPages ? 'Show' : 'Hide'} Pages
                            <Label.Detail>
                                {pages.length}
                            </Label.Detail>
                        </Label>}
                    <Container>
                        {pages && showPages &&
                            pages.map((page) => {
                                return (
                                    <Label
                                        style={labelStyle}
                                        key={page.page_id}
                                        as={Link}
                                        to={`/page?page_id=${page.page_id}`}>
                                        {page.page_name}
                                    </Label>
                                )
                            })
                        }
                    </Container>
                </Container>

                <Container style={subContainer}>
                    {categories &&
                        <Label as={'a'}
                            color={'blue'}
                            size={'large'}
                            onClick={() => this.setState({ showCategories: !showCategories })} >
                            {!showCategories ? 'Show' : 'Hide'} Categories
                            <Label.Detail>
                                {categories.length}
                            </Label.Detail>
                        </Label>}
                    <Container>
                        {categories && showCategories &&
                            categories.map((category) => {
                                return (
                                    <Label
                                        style={labelStyle}
                                        key={category.category_id} >
                                        {category.category_description}
                                    </Label>
                                )
                            })
                        }
                    </Container>
                </Container>

                <Container style={subContainer}>
                    {comments &&
                        <Label
                            as={'a'}
                            color={'blue'}
                            size={'large'}
                            onClick={() => this.setState({ showComments: !showComments })} >
                            {!showComments ? 'Show' : 'Hide'} Comments
                            <Label.Detail>
                                {comments.length}
                            </Label.Detail>
                        </Label>}
                    <Container>
                        {comments && showComments &&
                            comments.map((comment) => {
                                return (
                                    <Label
                                        style={labelStyle}
                                        key={comment.comment_id} >
                                        {comment.body}
                                    </Label>
                                )
                            })
                        }
                    </Container>
                </Container>

                <Container style={subContainer}>
                    {posts &&
                        <Label
                            as={'a'}
                            color={'blue'}
                            size={'large'}
                            onClick={() => this.setState({ showPosts: !showPosts })} >
                            {!showPosts ? 'Show' : 'Hide'} Posts
                            <Label.Detail>
                                {posts.length}
                            </Label.Detail>
                        </Label>}
                    <Container>
                        {posts && showPosts &&
                            posts.map((post) => {
                                return (
                                    <Label
                                        style={labelStyle}
                                        key={post.post_id} >
                                        {post.body}
                                    </Label>
                                )
                            })
                        }
                    </Container>

                </Container>
                <Label size={'large'} color={'grey'} as={Link} to={`/login`}> Go Back to Login </Label>
            </Container>
        )
    }
}

export default Admin