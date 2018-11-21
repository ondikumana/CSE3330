import React, { Component } from 'react'
import { Segment, Comment, Input } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'

class NewComment extends Component {

    state = {
        adminActivePage: null,
        signedInUser: null,
        commentText: ''
    }

    postComment = () => {
        const { signedInUser, commentText, adminActivePage } = this.state
        const { postId, doneAddingComment, adminActive } = this.props

        if (commentText.length == 0) {
            console.log('empty comment')
            return
        }

        axios.post(`${URL}/create_comment`, {
            post_id: postId,
            author_id: adminActive ? adminActivePage.account_id : signedInUser.account_id, 
            body: commentText
        })
            .then(() => {
                console.log('posted')
                doneAddingComment()
            })
            .catch((error) => console.log(error))

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault()
            this.postComment()
        }
    }

    componentDidMount = () => {
        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        const adminActivePage = JSON.parse(localStorage.getItem('adminActivePage'))
        this.setState({ signedInUser: signedInUser, adminActivePage: adminActivePage })
    }

    render() {
        const { signedInUser, commentText, adminActivePage } = this.state
        const { adminActive } = this.props

        return (
            <div>
                {signedInUser &&
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src={adminActive ? `https://ui-avatars.com/api/?name=${adminActivePage.page_name}` : `https://ui-avatars.com/api/?name=${signedInUser.fname + ' ' + signedInUser.lname}`} />
                            <Comment.Content>
                                <Comment.Author>{adminActive ? adminActivePage.page_name : signedInUser.fname + ' ' + signedInUser.lname}</Comment.Author>
                                <Comment.Text>
                                    <Input
                                        value={commentText}
                                        name='commentText'
                                        placeholder={'Enter Comment...'}
                                        onChange={e => this.handleChange(e)}
                                        onKeyPress={this.handleKeyPress} />
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action onClick={this.postComment} >Post</Comment.Action>
                                    <Comment.Action onClick={ () => this.props.cancelNewComment() } >Cancel</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                }
            </div>

        )
    }

}

export default NewComment