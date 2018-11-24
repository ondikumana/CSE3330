import React, { Component } from 'react'
import { Header, Image, Container, Label } from 'semantic-ui-react'
import axios from 'axios'
import URL from '../../../BackendUrl'

const container = {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '20px'
}

class Sender extends Component {
    state = {
        name: null,
        authorAccountType: 'profile',
        authorAccountId: null
    }

    fetchSenderAccountType = () => {
        const { senderId } = this.props

        axios.get(`${URL}/fetch_accounts?account_id=${senderId}`)
            .then((databaseResponse) => {

                const accountType = databaseResponse.data[0].account_type

                this.setState({ authorAccountType: accountType }, () => this.fetchAccountTypeId())

            })

            .catch(e => console.log(e))
    }

    fetchAccountTypeId = () => {
        const { authorAccountType } = this.state
        const { senderId } = this.props

        if (authorAccountType == 'profile') {
            axios.get(`${URL}/fetch_profiles?account_id=${senderId}`)
                .then((databaseResponse) => {
                    this.setState({
                        authorAccountId: databaseResponse.data[0].profile_id,
                        name: databaseResponse.data[0].fname + ' ' + databaseResponse.data[0].lname
                    })
                })

                .catch(e => console.log(e))
        }
        else {
            axios.get(`${URL}/fetch_pages?account_id=${senderId}`)
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

    render() {
        const { name } = this.state
        const { setActiveSender, senderId } = this.props
        return (
            <Container style={container}>
                <Label 
                    as='a'
                    size={'large'}
                    color={'grey'}
                    image 
                    onClick={() => setActiveSender(parseInt(senderId))}>
                    <Image avatar spaced={'right'} src={`https://ui-avatars.com/api/?name=${name}`} />
                    {name}
                </Label>
            </Container>

        )
    }
}

export default Sender;