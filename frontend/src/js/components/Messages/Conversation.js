import React, { Component } from 'react'
import Message from './Message'
import { Comment } from 'semantic-ui-react'
import TextBox from './TextBox';

class Conversation extends Component {

    render() {
        const { convoMessages, activeSender, signedInUser, fetchMessages, adminActivePage } = this.props

        return (
            <Comment.Group>
                {convoMessages &&
                    convoMessages.map((message, i) => {
                        return (
                            <Message key={i} message={message} />
                        )
                    })
                }
                <TextBox 
                    activeSender={activeSender} 
                    signedInUser={signedInUser}
                    fetchMessages={fetchMessages} 
                    adminActivePage={adminActivePage}/>

            </Comment.Group>

        )
    }
}

export default Conversation