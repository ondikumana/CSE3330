import React, { Component } from 'react'
import { Container, Segment, Comment, Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import PostComment from './PostComment'
import NewComment from './NewComment'

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

class Post extends Component {
    state = {
        comments: null,
        names: null,
        postLikes: null,
        postViews: null,
        addingComment: false,
        showComments: false,
        postLiked: false
    }

    fetchComments = () => {
        const { post } = this.props

        let comments = {}

        axios.get(`${URL}/fetch_comments?post_id=${post.post_id}`)
            .then((databaseResponse) => {

                comments[post.post_id] = databaseResponse.data

                for (let j = 0; j < databaseResponse.data.length; j++) {
                    const comment = databaseResponse.data[j];
                    this.addName(comment.author_id)
                }

                this.setState({
                    comments: comments
                })

            })

            .catch(e => console.log(e))

    }

    addName = (author_id) => {

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

    fetchPostLikes = () => {
        const { post } = this.props

        axios.get(`${URL}/fetch_post_likes?post_id=${post.post_id}`)
            .then((databaseResponse) => {

                const postLikes = databaseResponse.data

                //to check if the post was liked
                this.setState({ postLiked: false })
                const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
                for (let i = 0; i < postLikes.length; i++) {
                    if (postLikes[i].liked_by_id == signedInUser.account_id) {
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

    postPostLike = () => {
        const { post } = this.props
        const { postLiked } = this.state

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        if (!postLiked) {
            axios.post(`${URL}/create_post_like`, {
                post_id: post.post_id,
                liked_by_id: signedInUser.account_id
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
                liked_by_id: signedInUser.account_id
            })
                .then(() => {
                    console.log('like removed')
                    this.fetchPostLikes()
                })
                .catch((error) => console.log(error))
        }
    }

    postPostView = () => {
        const { post } = this.props

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        axios.post(`${URL}/create_post_view`, {
            post_id: post.post_id,
            viewed_by_id: signedInUser.account_id
        })
            .then(() => {
                console.log('viewed')
                this.fetchPostViews()
            })
            .catch((error) => console.log(error))

    }

    componentDidMount = () => {
        this.fetchComments()
        this.fetchPostLikes()
        this.fetchPostViews()
        this.addName(this.props.post.author_id)
        this.postPostView()
    }

    render() {
        const { post } = this.props
        const { comments, names, postLikes, postLiked, postViews, addingComment, showComments } = this.state

        return (
            <Container>
                <Segment compact>
                    {names && names[post.author_id] &&
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[post.author_id]}`} />
                                <Comment.Content>
                                    <Comment.Author as='a' >{names[post.author_id]}</Comment.Author>
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
                                        <Comment.Action onClick={this.postPostLike} >{postLiked ? 'Remove Like' : 'Like'}</Comment.Action>
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
                                postId={post.post_id}
                                doneAddingComment={() => { this.setState({ addingComment: false }); this.fetchComments() }}
                                cancelNewComment={() => this.setState({ addingComment: false })} />
                        }

                        <Button compact onClick={() => this.setState({ addingComment: true })}>New Comment</Button>
                    </Container>
                }

            </Container>
        )
    }
}

export default Post