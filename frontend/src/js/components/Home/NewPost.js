import React, { Component } from 'react'
import { Container, Segment, Comment, Icon, Button, Input, TextArea, Form } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'

const textAreaStyle = {
    width: '70%'
}

class NewPost extends Component {
    state = {
        adminActivePage: null,
        signedInUser: null,
        postText: ''
    }

    postPost = () => {
        const { signedInUser, postText, adminActivePage } = this.state
        const { doneAddingPost, destinationId, adminActive } = this.props

        if (postText.length == 0) {
            console.log('empty post')
            return
        }

        axios.post(`${URL}/create_post`, {
            author_id: adminActive ? adminActivePage.account_id : signedInUser.account_id,
            destination_id: destinationId,
            body: postText
        })
            .then(() => {
                console.log('posted')
                doneAddingPost()
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
            this.postPost()
        }
    }

    componentDidMount = () => {
        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        const adminActivePage = JSON.parse(localStorage.getItem('adminActivePage'))
        this.setState({ signedInUser: signedInUser, adminActivePage: adminActivePage })
    }

    render() {
        const { signedInUser, postText, adminActivePage } = this.state
        const { adminActive } = this.props

        return (
            <div>
                {signedInUser &&
                    <Segment style={textAreaStyle}>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={ adminActive ? `https://ui-avatars.com/api/?name=${adminActivePage.page_name}` : `https://ui-avatars.com/api/?name=${signedInUser.fname + ' ' + signedInUser.lname}` } />
                                <Comment.Content>
                                    <Comment.Author>{adminActive ? adminActivePage.page_name : signedInUser.fname + ' ' + signedInUser.lname}</Comment.Author>
                                    <Comment.Text>
                                        <Form>
                                            <TextArea
                                                autoHeight
                                                value={postText}
                                                name='postText'
                                                placeholder={'Enter Body...'}
                                                onChange={e => this.handleChange(e)}
                                                onKeyPress={this.handleKeyPress} />
                                        </Form>
                                    </Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={this.postPost}>Post</Comment.Action>
                                        <Comment.Action onClick={() => this.props.cancelNewPost()}>Cancel</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Segment>
                }
            </div>

        )
    }
}

export default NewPost