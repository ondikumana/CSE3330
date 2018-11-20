import React, { Component } from 'react'
import { Input, Container, Segment, Button, Message, Loader, Dimmer, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../BackendUrl'

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

        let passwordFromDatabase = databaseResponse.data[0].password
        if (this.state.password == passwordFromDatabase) {
          localStorage.setItem('signedInUser', JSON.stringify(databaseResponse.data[0]))
          this.setState({
            authenticationSuccess: true,
            loading: false
          })
        }
        else {
          this.setState({
            authenticationFail: true,
            authenticationFailMessage: 'Invalid Password',
            loading: false
          })
        }
      })

      .catch(e => console.log(e))

  }


  render() {
    if (this.state.authenticationSuccess || localStorage.getItem('signedInUser')) {
      return <Redirect push to="/home" />
    }

    return (
      <Container>
        <h1> Login </h1>
        <Segment floated='left' padded={'very'} color={'grey'}>
          <Dimmer.Dimmable blurring dimmed={this.state.loading}>
            {(this.state.authenticationFail) &&
              <Message negative>
                <Message.Header>Authentication Fail</Message.Header>
                <p>{this.state.authenticationFailMessage}</p>
              </Message>
            }
            <Form>
              <Form.Field>
                <Input
                  icon='mail'
                  label='Username'
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
                  floated='right'
                  compact
                  onClick={this.authenticate}>
                  Login
      </Button>
              </Form.Field>
            </Form>

          </Dimmer.Dimmable>
        </Segment>
      </Container>
    )
  }
}
