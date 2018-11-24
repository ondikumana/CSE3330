import React, { Component } from 'react'
import { Segment, Comment, Icon } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { HomeContext } from './HomeProvider'
import { Link } from 'react-router-dom'


class PostComment extends Component {

    state = {
        commentLikes: null,
        commentLiked: false,
        authorAccountType: 'profile',
        authorAccountType: null

    }

    postCommentLike = (adminActivePage) => {
        const { comment } = this.props
        const { commentLiked } = this.state

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

        if (!commentLiked) {
            axios.post(`${URL}/create_comment_like`, {
                comment_id: comment.comment_id,
                liked_by_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id
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
                liked_by_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id
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

    fetchPostAuthorAccountType = () => {
        const { comment } = this.props

        axios.get(`${URL}/fetch_accounts?account_id=${comment.author_id}`)
            .then((databaseResponse) => {

                const accountType = databaseResponse.data[0].account_type

                this.setState({ authorAccountType: accountType }, () => this.fetchAccountTypeId())

            })

            .catch(e => console.log(e))
    }

    fetchAccountTypeId = () => {
        const { authorAccountType } = this.state
        const { comment } = this.props

        if (authorAccountType == 'profile') {
            axios.get(`${URL}/fetch_profiles?account_id=${comment.author_id}`)
                .then((databaseResponse) => {
                    this.setState({ authorAccountId: databaseResponse.data[0].profile_id })
                })

                .catch(e => console.log(e))
        }
        else {
            axios.get(`${URL}/fetch_pages?account_id=${comment.author_id}`)
                .then((databaseResponse) => {
                    this.setState({ authorAccountId: databaseResponse.data[0].page_id })
                })

                .catch(e => console.log(e))
        }
    }

    componentDidMount = () => {
        this.fetchCommentLikes()
        this.fetchPostAuthorAccountType()
    }

    render() {
        const { comment, names } = this.props
        const { commentLikes, commentLiked, authorAccountType, authorAccountId } = this.state

        if (comment && names) {
            return (
                <HomeContext.Consumer>
                    {(value) => {
                        const { signedInUser, adminActivePage } = value
                        return (
                            <Comment key={comment.comment_id} >
                                <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[comment.author_id]}`} />
                                <Comment.Content>
                                    {signedInUser.account_id == comment.author_id && authorAccountType == 'profile' ?
                                        <Comment.Author as={Link} to={`/me`} >{names[comment.author_id]}</Comment.Author>
                                        :
                                        <Comment.Author as={Link} to={authorAccountType == 'profile' ? `/profile?profile_id=${authorAccountId}` : `/page?page_id=${authorAccountId}`} >{names[comment.author_id]}</Comment.Author>
                                    }
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
                                        <Comment.Action onClick={() => this.postCommentLike(adminActivePage)}>{commentLiked ? 'Remove Like' : 'Like'}</Comment.Action>
                                    </Comment.Actions>

                                </Comment.Content>

                            </Comment>
                        )
                    }}
                </HomeContext.Consumer>
            )
        }
        else {
            return (<div></div>)
        }

    }
}

export default PostComment