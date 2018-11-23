import React, { Component } from 'react'
import { Container, Input, Icon } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { HomeContext } from '../Home/HomeProvider'

const inputStyle = {
    width: '100%'
}

class TextBox extends Component {
    state = {
        message: ''
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
            this.sendMessage()
        }
    }

    sendMessage = () => {

        const { message } = this.state
        const { activeSender, fetchMessages, adminActivePage, signedInUser } = this.props
        console.log(adminActivePage, signedInUser)

        axios.post(`${URL}/create_message`, {
            sender_id: adminActivePage ? adminActivePage.account_id : signedInUser.account_id,
            recipient_id: activeSender,
            body: message
        })
            .then(() => {
                console.log('message sent')
                this.setState({ message: '' })
                fetchMessages()
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { message } = this.state

        return (
            <Container>
                <Input
                    style={inputStyle}
                    icon={
                        <Icon
                            name='send'
                            inverted circular link
                            onClick={() => this.sendMessage()} />
                    }
                    value={message}
                    name='message'
                    placeholder={'Enter Message...'}
                    onChange={e => this.handleChange(e)}
                    onKeyPress={(e) => this.handleKeyPress(e)} />
            </Container>
        )
    }
}

export default TextBox;