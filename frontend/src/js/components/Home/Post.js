import React, { Component } from 'react'
import { Container, Segment, Comment, Icon, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'
import PostComment from './PostComment'
import NewComment from './NewComment'
import { HomeContext } from './HomeProvider'


const commentContainerStyle = {
    paddingLeft: '50px',
    marginBottom: '20px'
}

const commentGroupStyle = {
    marginBottom: '10px'
}

const buttonStyle = {
    marginTop: '0px'
}

const postStyle = {
    display: 'block',
    borderRadius: '20px 50px',
    border: '2px solid #767777',
    backgroundColor: 'rgba(255, 255, 255, .3)',
}

class Post extends Component {
    state = {
        comments: null,
        names: null,
        postLikes: null,
        postViews: null,
        addingComment: false,
        showComments: false,
        postLiked: false,
        authorAccountType: null,
        authorAccountId: null
    }

    fetchComments = () => {
        const { post } = this.props

        let comments = {}

        axios.get(`${URL}/fetch_comments?post_id=${post.post_id}`)
            .then((databaseResponse) => {

                comments[post.post_id] = databaseResponse.data

                for (let j = 0; j < databaseResponse.data.length; j++) {
                    const comment = databaseResponse.data[j];

                    axios.get(`${URL}/fetch_accounts?account_id=${comment.author_id}`)
                        .then((databaseResponse) => {

                            const accountType = databaseResponse.data[0].account_type

                            this.addName(comment.author_id, accountType)

                        })

                        .catch(e => console.log(e))

                }

                this.setState({
                    comments: comments
                })

            })

            .catch(e => console.log(e))

    }

    addName = (author_id, accountType) => {

        if (accountType == 'profile') {
            axios.get(`${URL}/fetch_profiles?account_id=${author_id}`)
                .then((databaseResponse) => {
                    const fname = databaseResponse.data[0].fname
                    const lname = databaseResponse.data[0].lname
                    let names = this.state.names || {}
                    names[author_id] = fname + ' ' + lname

                    this.setState({
                        names: names
                    })
                })

                .catch(e => console.log(e))
        }
        else {
            axios.get(`${URL}/fetch_pages?account_id=${author_id}`)
                .then((databaseResponse) => {

                    const pageName = databaseResponse.data[0].page_name

                    let names = this.state.names || {}

                    names[author_id] = pageName

                    this.setState({
                        names: names
                    })
                })

                .catch(e => console.log(e))
        }

    }

    fetchPostLikes = () => {
        const { post, adminActivePage } = this.props

        axios.get(`${URL}/fetch_post_likes?post_id=${post.post_id}`)
            .then((databaseResponse) => {

                const postLikes = databaseResponse.data

                //to check if the post was liked
                this.setState({ postLiked: false })
                const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
                for (let i = 0; i < postLikes.length; i++) {
                    if (adminActivePage && postLikes[i].liked_by_id == adminActivePage.account_id) {
                        this.setState({ postLiked: true })
                    }

                    if (!adminActivePage && postLikes[i].liked_by_id == signedInUser.account_id) {
                        this.setState({ postLiked: true })
                    }
                }

                this.setState({
                    postLikes: postLikes
                })

            })

            .catch(e => console.log(e))
    }

    fetchPostViews = () => {
        const { post } = this.props

        axios.get(`${URL}/fetch_post_views?post_id=${post.post_id}`)
            .then((databaseResponse) => {

                this.setState({
                    postViews: databaseResponse.data
                })

            })

            .catch(e => console.log(e))
    }

    fetchPostAuthorAccountType = () => {
        const { post } = this.props

        axios.get(`${URL}/fetch_accounts?account_id=${post.author_id}`)
            .then((databaseResponse) => {

                const accountType = databaseResponse.data[0].account_type

                this.setState({ authorAccountType: accountType }, () => this.fetchAccountTypeId())

                this.addName(post.author_id, accountType)

            })

            .catch(e => console.log(e))
    }

    postPostLike = (adminActivePage) => {
        const { post } = this.props
        const { postLiked } = this.state

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        if (!postLiked) {
            axios.post(`${URL}/create_post_like`, {
                post_id: post.post_id,
                liked_by_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id
            })
                .then(() => {
                    console.log('liked')
                    this.fetchPostLikes()
                })
                .catch((error) => console.log(error))
        }
        // removes like
        else {
            axios.post(`${URL}/remove_post_like`, {
                post_id: post.post_id,
                liked_by_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id
            })
                .then(() => {
                    console.log('like removed')
                    this.fetchPostLikes()
                })
                .catch((error) => console.log(error))
        }
    }

    postPostView = () => {
        const { post, adminActivePage } = this.props

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        axios.post(`${URL}/create_post_view`, {
            post_id: post.post_id,
            viewed_by_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id
        })
            .then(() => {
                console.log('viewed')
                this.fetchPostViews()
            })
            .catch((error) => console.log(error))

    }

    fetchAccountTypeId = () => {
        const { authorAccountType } = this.state
        const { post } = this.props

        if (authorAccountType == 'profile') {
            axios.get(`${URL}/fetch_profiles?account_id=${post.author_id}`)
                .then((databaseResponse) => {
                    this.setState({ authorAccountId: databaseResponse.data[0].profile_id })
                })

                .catch(e => console.log(e))
        }
        else {
            axios.get(`${URL}/fetch_pages?account_id=${post.author_id}`)
                .then((databaseResponse) => {
                    this.setState({ authorAccountId: databaseResponse.data[0].page_id })
                })

                .catch(e => console.log(e))
        }
    }

    componentDidMount = () => {
        this.fetchComments()
        this.fetchPostLikes()
        this.fetchPostViews()
        this.fetchPostAuthorAccountType()
        this.postPostView()
    }

    render() {
        const { post, adminActive } = this.props
        const { comments, names, postLikes, postLiked, postViews, addingComment, showComments, authorAccountType, authorAccountId } = this.state

        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { signedInUser, adminActivePage } = value

                    return (
                        <Container>
                            <Segment compact style={postStyle} color={post.author_id == signedInUser.account_id ? 'blue' : 'teal'}>
                                {signedInUser && authorAccountId && names && names[post.author_id] &&
                                    <Comment.Group>
                                        <Comment>
                                            <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[post.author_id]}`} />
                                            <Comment.Content>
                                                {signedInUser.account_id == post.author_id && authorAccountType == 'profile' ?
                                                    <Comment.Author as={Link} to={`/me`} >{names[post.author_id]}</Comment.Author>
                                                    :
                                                    <Comment.Author as={Link} to={authorAccountType == 'profile' ? `/profile?profile_id=${authorAccountId}` : `/page?page_id=${authorAccountId}`} >{names[post.author_id]}</Comment.Author>
                                                }
                                                <Comment.Metadata>
                                                    <div>{post.time}</div>
                                                    {postLikes &&
                                                        <div>
                                                            <Icon name='thumbs up' />
                                                            {postLikes.length}
                                                        </div>
                                                    }
                                                    {postViews &&
                                                        <div>
                                                            <Icon name='eye' />
                                                            {postViews.length}
                                                        </div>
                                                    }
                                                </Comment.Metadata>
                                                <Comment.Text>{post.body}</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action onClick={() => this.postPostLike(adminActivePage)} >{postLiked ? 'Remove Like' : 'Like'}</Comment.Action>
                                                    <Comment.Action onClick={() => this.setState({ showComments: !showComments })}>{showComments ? 'Hide' : 'Show'} Comments</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                    </Comment.Group>
                                }
                            </Segment>
                            {showComments && comments && comments[post.post_id] &&
                                <Container style={commentContainerStyle} >
                                    <Comment.Group style={commentGroupStyle} >
                                        {comments[post.post_id].map((comment) => {
                                            return (
                                                <PostComment key={comment.comment_id} comment={comment} names={names} />
                                            )
                                        })}
                                    </Comment.Group>

                                    {addingComment &&
                                        <NewComment
                                            adminActive={adminActive}
                                            postId={post.post_id}
                                            doneAddingComment={() => { this.setState({ addingComment: false }); this.fetchComments() }}
                                            cancelNewComment={() => this.setState({ addingComment: false })} />
                                    }

                                    <Label as={'a'} color={'blue'} size={'medium'} onClick={() => this.setState({ addingComment: true })}>New Comment</Label>
                                </Container>
                            }

                        </Container>
                    )
                }}
            </HomeContext.Consumer>


        )
    }
}

export default Post