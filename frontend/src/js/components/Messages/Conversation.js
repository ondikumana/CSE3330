import React, { Component } from 'react'
import Message from './Message'
import { Comment, Container } from 'semantic-ui-react'
import TextBox from './TextBox'

const messageGroup = {
    width: 'auto',
    height: '600px',
    maxWidth: 'none',
    overflowX: 'hidden'
}

class Conversation extends Component {

    render() {
        const { convoMessages, activeSender, signedInUser, fetchMessages, adminActivePage } = this.props

        return (
            <Container>
                <Comment.Group style={messageGroup}>
                    {convoMessages &&
                        convoMessages.map((message, i) => {
                            return (
                                <Message key={i} message={message} />
                            )
                        })
                    }

                </Comment.Group>
                <TextBox
                    activeSender={activeSender}
                    signedInUser={signedInUser}
                    fetchMessages={fetchMessages}
                    adminActivePage={adminActivePage} />
            </Container>

        )
    }
}

export default Conversation