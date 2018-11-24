import React, { Component } from 'react'
import { Input, Container, Segment, Button, Message, Loader, Dimmer, Form, Label } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'

const container = {
  width: '25%',
  paddingTop: '280px'
}

const segmentStyle = {
  display: 'block',
  borderRadius: '20px 50px',
  border: '2px solid #767777',
  backgroundColor: 'rgba(255, 255, 255, .3)',
}


export default class LoginPage extends Component {

  state = {
    email: null,
    username: null,
    password: null,
    loading: false,
    authenticationFail: false,
    authenticationFailMessage: null,
    authenticationSuccess: false
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
      this.authenticate()
    }
  }

  authenticate = () => {

    this.setState({
      authenticationFail: false,
      loading: true
    })

    if (!this.state.username || !this.state.password) {

      this.setState({
        authenticationFail: true,
        authenticationFailMessage: 'Fields cannot be left empty',
        loading: false
      })

      return
    }

    axios.get(`${URL}/fetch_profiles?username=${this.state.username}`)
      .then((databaseResponse) => {

        if (databaseResponse.data.length > 0 && this.state.password == databaseResponse.data[0].password) {
          localStorage.setItem('signedInUser', JSON.stringify(databaseResponse.data[0]))
          this.setState({
            authenticationSuccess: true,
            loading: false
          })
        }
        else {
          this.setState({
            authenticationFail: true,
            authenticationFailMessage: 'Invalid Password or Account',
            loading: false
          })
        }
      })

      .catch(e => console.log(e))

  }


  render() {
    if (this.state.authenticationSuccess || localStorage.getItem('signedInUser')) {
      return <Redirect push to="/me" />
    }

    return (
      <Container style={container}>

        <Segment style={segmentStyle} padded={'very'} color={'blue'} >
          <Dimmer.Dimmable blurring dimmed={this.state.loading}>
            {(this.state.authenticationFail) &&
              <Message negative>
                <Message.Header>Authentication Fail</Message.Header>
                <p>{this.state.authenticationFailMessage}</p>
              </Message>
            }
            <Form style={{ padding: '20px' }}>
              <Form.Field>
                <Input
                  icon='mail'
                  label='Username'
                  color={'blue'}
                  placeholder='abcdefg'
                  name='username'
                  onChange={e => this.handleChange(e)}
                  onKeyPress={this.handleKeyPress} />
              </Form.Field>
              <Form.Field>
                <Input
                  icon='lock'
                  className='field'
                  type='password'
                  label='Password'
                  name='password'
                  placeholder={'******'}
                  onChange={e => this.handleChange(e)}
                  onKeyPress={this.handleKeyPress} />
              </Form.Field>
              <Form.Field>
                <Button
                  color={'blue'}
                  floated='right'
                  compact
                  onClick={this.authenticate}>
                  Login
                </Button>
              </Form.Field>
            </Form>

          </Dimmer.Dimmable>
        </Segment>
        <Label as={Link} to={`/register`} size={'medium'} color={'grey'} >Sign Up</Label>
        <Label as={Link} to={`/admin`} size={'medium'} color={'grey'} >Admin View</Label>
      </Container>
    )
  }
}
