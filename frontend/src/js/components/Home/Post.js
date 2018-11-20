import React, { Component } from 'react'
import { Container, Segment, Comment, Image, Grid, Icon } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import PostComment from './PostComment'

const commentStyle = {
    marginLeft: '50px'
}

class Post extends Component {
    state = {
        comments: null,
        names: null,
        postLikes: null,
        postViews: null
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

                this.setState({
                    postLikes: databaseResponse.data
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

    componentDidMount = () => {
        this.fetchComments()
        this.fetchPostLikes()
        this.fetchPostViews()
    }

    render() {
        const { post } = this.props
        const { comments, names, postLikes, postViews } = this.state

        return (
            <Container>
                <Segment compact>
                    {names && names[post.author_id] &&
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[post.author_id]}`} />
                                <Comment.Content>
                                    <Comment.Author>{names[post.author_id]}</Comment.Author>
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
                                        <Comment.Action>Comment</Comment.Action>
                                        <Comment.Action>Like</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    }
                </Segment>
                {comments && comments[post.post_id] &&
                    <Comment.Group style={commentStyle}>
                        {comments[post.post_id].map((comment) => {
                            return (
                                <PostComment key={comment.comment_id} comment={comment} names={names} />
                            )
                        })}
                    </Comment.Group>
                }
            </Container>
        )
    }
}

export default Post