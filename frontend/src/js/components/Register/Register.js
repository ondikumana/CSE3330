import React from 'react'
import { Form, Input, Button, Label, Message, Container, Segment } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'

const labelStyle = {
    float: 'left'
}

const container = {
    width: '30%',
    paddingTop: '100px'
}

const segmentStyle = {
    display: 'block',
    borderRadius: '20px 50px',
    border: '2px solid #767777',
    backgroundColor: 'rgba(255, 255, 255, .3)',
}


class Register extends React.Component {

    state = {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        error: null,
        doneRegistering: false
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
          // Prevent the default action to stop scrolling when space is pressed
          e.preventDefault()
          this.createAccount()
        }
      }

    createProfile = (account_id) => {
        const { fname, lname, phone, email, username, password } = this.state

        axios.post(`${URL}/create_profile?`, {
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            username: username,
            password: password,
            account_id: account_id
        })
            .then((databaseResponse) => {
                const profileId = databaseResponse.data[0].profile_id
                console.log('profile created', profileId)

                this.fetchProfile(profileId)

            })
            .catch((error) => { 
                console.log(error)
                this.setState({ error: true })
                this.deleteAccout(account_id) 
            })
    }

    fetchProfile = (profileId) => {
        axios.get(`${URL}/fetch_profiles?profile_id=${profileId}`)
            .then((databaseResponse) => {

                localStorage.setItem('signedInUser', JSON.stringify(databaseResponse.data[0]))
                this.setState({ doneRegistering: true })
            })

            .catch((error) => { 
                console.log(error)
                this.setState({ error: true }) 
            })
    }

    deleteAccout = (account_id) => {
        axios.post(`${URL}/remove_account`, {
            account_id: account_id,
        })
            .then(() => {
                console.log('deleted')
            })
            .catch((error) => console.log(error))
    }

    createAccount = () => {

        this.setState({ error: false })

        axios.post(`${URL}/create_account`, {
            account_type: 'profile'
        })
            .then((databaseResponse) => {
                const account_id = databaseResponse.data[0].account_id
                console.log('account created', account_id)

                this.createProfile(account_id)

            })
            .catch((error) => { console.log(error); this.setState({ error: true }) })
    }

    render() {
        const { fname, lname, phone, email, username, password, error, doneRegistering } = this.state

        if (doneRegistering || localStorage.getItem('signedInUser')) {
            return <Redirect push to="/me" />
        }

        return (
            <Container style={container}>
                <Segment padded={'very'} compact style={segmentStyle} color={'blue'} >
                    <Form style={{ padding: '20px' }}>
                        {error && <Message negative content={'An Error Has Occured. Try Again'} />}

                        <Form.Field required>
                            <label style={labelStyle}>First Name</label>
                            <Input
                                name={'fname'}
                                value={fname}
                                placeholder={'Jon'}
                                onChange={this.handleInputChange} />

                        </Form.Field>

                        <Form.Field required>
                            <label style={labelStyle}>Last Name</label>
                            <Input
                                name={'lname'}
                                value={lname}
                                placeholder={'Doe'}
                                onChange={this.handleInputChange} />

                        </Form.Field>

                        <Form.Field>
                            <label style={labelStyle}>Phone</label>
                            <Input
                                name={'phone'}
                                type={'text'}
                                placeholder={'123-456-7890'}
                                value={phone}
                                onChange={this.handleInputChange} />
                        </Form.Field>

                        <Form.Field required>
                            <label style={labelStyle}>Email</label>
                            <Input
                                name={'email'}
                                type={'email'}
                                value={email}
                                placeholder={'doe@bleh.com'}
                                onChange={this.handleInputChange} />
                        </Form.Field>

                        <Form.Field required>
                            <label style={labelStyle}>Username</label>
                            <Input
                                name={'username'}
                                type={'text'}
                                placeholder={'jdoe'}
                                value={username}
                                onChange={this.handleInputChange} />
                        </Form.Field>

                        <Form.Field required>
                            <label style={labelStyle}>Password</label>
                            <Input
                                name={'password'}
                                type={'password'}
                                value={password}
                                placeholder={'*******'}
                                onChange={this.handleInputChange} 
                                onKeyPress={(e) => this.handleKeyPress(e)}/>
                        </Form.Field>

                        <Form.Field>
                            <Button
                                type={'button'}
                                compact
                                color={'blue'}
                                disabled={fname == '' || lname == '' || email == '' || username == '' || password == ''}
                                floated={'right'}
                                onClick={this.createAccount} >
                                Sign Up
                            </Button>
                        </Form.Field>
                        <Label size={'large'} color={'grey'} as={Link} to={`/login`} style={{marginTop: '3px'}} > Go Back to Login </Label>
                    </Form>
                </Segment>

            </Container>
        )
    }
}

export default Register