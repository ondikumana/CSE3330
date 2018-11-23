import React, { Component } from 'react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { Grid, Button, Label, Container } from 'semantic-ui-react'
import Sender from './Sender';
import Conversation from './Conversation'
import { Redirect } from 'react-router-dom'

const buttonStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '20px'
}

class Messages extends Component {
    state = {
        messages: null,
        activeSender: null,
        senders: null,
        convoMessages: null,
        signedInUser: null,
        adminActivePage: null,
        goingBackToMe: false
    }

    fetchMessages = () => {

        const { signedInUser, activeSender, adminActivePage } = this.state

        axios.get(`${URL}/fetch_messages?recipient_id=${adminActivePage ? adminActivePage.account_id : signedInUser.account_id}&sender_id=${adminActivePage ? adminActivePage.account_id : signedInUser.account_id}`)
            .then((databaseResponse) => {

                const messages = databaseResponse.data

                let senders = {}

                for (let i = 0; i < messages.length; i++) {
                    // if (adminActivePage && adminActivePage.account_id == messages[i].sender_id) {
                    //     continue
                    // }

                    // if (signedInUser.account_id == messages[i].sender_id) {
                    //     continue
                    // }

                    senders[messages[i].sender_id] = true
                    senders[messages[i].recipient_id] = true
                }

                console.log(senders)

                if (adminActivePage) {
                    delete senders[adminActivePage.account_id]
                }
                else {
                    delete senders[signedInUser.account_id]
                }

                if (activeSender) {
                    senders[activeSender] = true
                }

                console.log(messages)

                this.setState({
                    messages: messages,
                    senders: Object.keys(senders)
                }, () => this.getConvoMessages())

            })

            .catch(e => console.log(e))
    }

    getConvoMessages = () => {
        const { messages, activeSender, signedInUser, adminActivePage } = this.state

        if (!activeSender) {
            return
        }

        let convoMessages = []

        if (adminActivePage) {
            for (let i = 0; i < messages.length; i++) {
                if ((messages[i].sender_id == activeSender && messages[i].recipient_id == adminActivePage.account_id) ||
                    (messages[i].sender_id == adminActivePage.account_id && messages[i].recipient_id == activeSender)) {
                    convoMessages.push(messages[i])
                }
            }
        }
        else {
            for (let i = 0; i < messages.length; i++) {
                if ((messages[i].sender_id == activeSender && messages[i].recipient_id == signedInUser.account_id) ||
                    (messages[i].sender_id == signedInUser.account_id && messages[i].recipient_id == activeSender)) {
                    convoMessages.push(messages[i])
                }
            }
        }


        this.setState({ convoMessages: convoMessages })
    }

    componentDidMount = () => {

        const paramsAsString = this.props.location.search
        const query = paramsAsString.substring(1, paramsAsString.length)
        const queryArr = query.split('&')
        const queryArrLength = queryArr.length

        for (let i = 0; i < queryArrLength; i++) {
            if (queryArr[i].includes('recipient_id')) {
                const recipientIdArr = queryArr[i].split('=')
                this.setState({ activeSender: recipientIdArr[1] })
                break
            }
        }

        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        const adminActivePage = JSON.parse(localStorage.getItem('adminActivePage'))
        this.setState({ signedInUser: signedInUser, adminActivePage: adminActivePage }, () => this.fetchMessages())
    }

    render() {
        const { convoMessages, activeSender, senders, signedInUser, adminActivePage, goingBackToMe } = this.state

        if (goingBackToMe) {
            return <Redirect push to="/me" />
        }

        return (
            <Container>
                
                <h1>Messages</h1>
                {adminActivePage && <div> <Label>Active as {adminActivePage.page_name}</Label> <br/><br/> </div>}

                <Grid divided>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            {senders &&
                                senders.map((sender) => {
                                    return (
                                        <Sender
                                            key={sender}
                                            senderId={sender}
                                            setActiveSender={(senderId) => this.setState({ activeSender: senderId }, () => this.getConvoMessages())} />
                                    )
                                })
                            }
                        </Grid.Column>
                        <Grid.Column width={12}>
                            {activeSender &&
                                <Conversation
                                    activeSender={activeSender}
                                    convoMessages={convoMessages}
                                    signedInUser={signedInUser}
                                    fetchMessages={() => this.fetchMessages()}
                                    adminActivePage={adminActivePage} />
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Button style={buttonStyle} compact onClick={() => this.setState({ goingBackToMe: true })}> Go Back to Me </Button>
            </Container>
        )
    }
}

export default Messages