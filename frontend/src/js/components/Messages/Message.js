import React, { Component } from 'react'
import { Segment, Comment, Icon, Grid } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { HomeContext } from '../Home/HomeProvider'
import { Link } from 'react-router-dom'

const meMessageStyle = {
    paddingLeft: '70%',
    marginTop: '10px',
    marginBottom: '10px'
}

const otherMessageStyle = {
    paddingRight: '70%',
    marginTop: '10px',
    marginBottom: '10px'
}

class Message extends Component {
    state = {
        senderId: null,
        name: null,
        authorAccountType: 'profile',
        authorAccountId: null
    }

    fetchSenderAccountType = () => {
        const { message } = this.props

        this.setState({ senderId: message.sender_id })

        axios.get(`${URL}/fetch_accounts?account_id=${message.sender_id}`)
            .then((databaseResponse) => {

                const accountType = databaseResponse.data[0].account_type

                this.setState({ authorAccountType: accountType }, () => this.fetchAccountTypeId())

            })

            .catch(e => console.log(e))
    }

    fetchAccountTypeId = () => {
        const { authorAccountType } = this.state
        const { message } = this.props

        if (authorAccountType == 'profile') {
            axios.get(`${URL}/fetch_profiles?account_id=${message.sender_id}`)
                .then((databaseResponse) => {

                    this.setState({
                        authorAccountId: databaseResponse.data[0].profile_id,
                        name: databaseResponse.data[0].fname + ' ' + databaseResponse.data[0].lname
                    })
                })

                .catch(e => console.log(e))
        }
        else {
            axios.get(`${URL}/fetch_pages?account_id=${message.sender_id}`)
                .then((databaseResponse) => {

                    this.setState({
                        authorAccountId: databaseResponse.data[0].page_id,
                        name: databaseResponse.data[0].page_name
                    })
                })

                .catch(e => console.log(e))
        }
    }

    componentDidMount = () => {
        this.fetchSenderAccountType()
    }

    componentDidUpdate = () => {
        const { senderId } = this.state
        const { message } = this.props
        if (senderId != message.sender_id) {
            this.fetchSenderAccountType()
        }
    }

    render() {
        const { name, authorAccountType, authorAccountId } = this.state
        const { message } = this.props

        return (
            <HomeContext.Consumer>
                {(value) => {

                    const { signedInUser, adminActivePage } = value

                    return (
                        <Grid>
                            <Grid.Row>
                                <Grid.Column
                                    width={10}
                                    floated={(!adminActivePage && signedInUser.account_id == message.sender_id) || (adminActivePage && adminActivePage.account_id == message.sender_id) ? 'right' : 'left'}>
                                    
                                    {name &&
                                        <Comment style={{ 
                                            maxWidth: 'none',
                                            float: (!adminActivePage && signedInUser.account_id == message.sender_id) || (adminActivePage && adminActivePage.account_id == message.sender_id) ? 'right' : 'left'
                                            }}>
                                            <Comment.Avatar src={`https://ui-avatars.com/api/?name=${name}`} />
                                            <Comment.Content>
                                                {signedInUser.account_id == message.sender_id && authorAccountType == 'profile' ?
                                                    <Comment.Author as={Link} to={`/me`} >{name}</Comment.Author>
                                                    :
                                                    <Comment.Author as={Link} to={authorAccountType == 'profile' ? `/profile?profile_id=${authorAccountId}` : `/page?page_id=${authorAccountId}`} >{name}</Comment.Author>
                                                }
                                                <Comment.Metadata>
                                                    <span>{message.sent_time}</span>
                                                </Comment.Metadata>
                                                <Comment.Text>{message.body}</Comment.Text>
                                            </Comment.Content>

                                        </Comment>
                                    }

                                </Grid.Column>
                            </Grid.Row>

                        </Grid>

                    )
                }}
            </HomeContext.Consumer>

        )
    }
}

export default Message