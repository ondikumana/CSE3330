import React, { Component } from 'react'
import { Container, Segment, Comment, Icon, Button, Input, TextArea, Form } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { HomeContext } from './HomeProvider';

const textAreaStyle = {
    width: '70%'
}

class NewPost extends Component {
    state = {
        postText: ''
    }

    postPost = (signedInUser, adminActivePage) => {
        const { postText } = this.state
        const { doneAddingPost, destinationId } = this.props

        if (postText.length == 0) {
            console.log('empty post')
            return
        }

        axios.post(`${URL}/create_post`, {
            author_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id,
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

    render() {
        const { postText } = this.state

        return (
            <HomeContext.Consumer>
                {(value) => {

                    const { adminActive, adminActivePage, signedInUser } = value

                    return (
                        <div>
                            {signedInUser &&
                                <Segment style={textAreaStyle}>
                                    <Comment.Group>
                                        <Comment>
                                            <Comment.Avatar src={adminActive ? `https://ui-avatars.com/api/?name=${adminActivePage.page_name}` : `https://ui-avatars.com/api/?name=${signedInUser.fname + ' ' + signedInUser.lname}`} />
                                            <Comment.Content>
                                                <Comment.Author>{adminActive ? adminActivePage.page_name : signedInUser.fname + ' ' + signedInUser.lname}</Comment.Author>
                                                <Comment.Text>
                                                    <Form>
                                                        <TextArea
                                                            autoHeight
                                                            value={postText}
                                                            name='postText'
                                                            placeholder={'Enter Body...'}
                                                            onChange={e => this.handleChange(e)} />
                                                    </Form>
                                                </Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action onClick={() => this.postPost(signedInUser, adminActivePage)}>Post</Comment.Action>
                                                    <Comment.Action onClick={() => this.props.cancelNewPost()}>Cancel</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                    </Comment.Group>
                                </Segment>
                            }
                        </div>

                    )
                }}
            </HomeContext.Consumer>

        )
    }
}

export default NewPost