import React, { Component } from 'react'
import { Segment, Comment, Icon } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'

class PostComment extends Component {

    state = {
        commentLikes: null,
        commentLiked: false
    }

    postCommentLike = () => {
        const { comment } = this.props
        const { commentLiked } = this.state

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        if (!commentLiked) {
            axios.post(`${URL}/create_comment_like`, {
                comment_id: comment.comment_id,
                liked_by_id: signedInUser.account_id
            })
                .then(() => {
                    console.log('liked')
                    this.fetchCommentLikes()
                })
                .catch((error) => console.log(error))
        }
        // removes like
        else {
            axios.post(`${URL}/remove_comment_like`, {
                comment_id: comment.comment_id,
                liked_by_id: signedInUser.account_id
            })
                .then(() => {
                    console.log('like removed')
                    this.fetchCommentLikes()
                })
                .catch((error) => console.log(error))
        }
    }

    fetchCommentLikes = () => {
        const { comment } = this.props

        axios.get(`${URL}/fetch_comment_likes?comment_id=${comment.comment_id}`)
            .then((databaseResponse) => {

                const commentLikes = databaseResponse.data

                //to check if the post was liked
                this.setState({ commentLiked: false })
                const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
                for (let i = 0; i < commentLikes.length; i++) {
                    if (commentLikes[i].liked_by_id == signedInUser.account_id) {
                        this.setState({ commentLiked: true })
                    }
                }

                this.setState({
                    commentLikes: commentLikes
                })

            })

            .catch(e => console.log(e))
    }

    componentDidMount = () => {
        this.fetchCommentLikes()
    }

    render() {
        const { comment, names } = this.props
        const { commentLikes, commentLiked } = this.state

        if (comment && names) {
            return (
                <Comment key={comment.comment_id} >
                    <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[comment.author_id]}`} />
                    <Comment.Content>
                        <Comment.Author as='a'>{names[comment.author_id]}</Comment.Author>
                        <Comment.Metadata>
                            <span>{comment.time}</span>
                            {commentLikes &&
                                <div>
                                    <Icon name='thumbs up' />
                                    {commentLikes.length}
                                </div>
                            }
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action onClick={this.postCommentLike}>{commentLiked ? 'Remove Like' : 'Like'}</Comment.Action>
                        </Comment.Actions>

                    </Comment.Content>

                </Comment>
            )
        }
        else {
            return (<div></div>)
        }

    }
}

export default PostComment