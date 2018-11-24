import React, { Component } from 'react'
import { Label, Checkbox, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { HomeContext } from '../Home/HomeProvider'
import axios from 'axios'
import URL from '../../../BackendUrl'

const pageStyle = {
    marginTop: '15px',
    marginBottom: '15px'
}

const checkboxStyle = {
    marginLeft: '15px'
}

class Member extends Component {
    state = {
        profile: null,
        isAdmin: false
    }

    changeAdmin = () => {
        const { isAdmin } = this.state
        const { profileId, pageId, isSignedInUserAdmin } = this.props

        if (!isSignedInUserAdmin) {
            console.log('not admin')
            return
        }

        if (isAdmin) {
            axios.post(`${URL}/remove_admin`, {
                page_id: pageId,
                profile_id: profileId,
            })
                .then(() => {
                    console.log('admin removed')
                    this.checkIfAdmin(profileId)
                })
                .catch((error) => console.log(error))
        }
        else {
            axios.post(`${URL}/create_admin`, {
                page_id: pageId,
                profile_id: profileId,
            })
                .then(() => {
                    console.log('admin created')
                    this.checkIfAdmin(profileId)
                })
                .catch((error) => console.log(error))
        }
    }

    checkIfAdmin = (profileId, pageId) => {
        this.setState({ isAdmin: false })
        axios.get(`${URL}/fetch_admins?profile_id=${profileId}&page_id=${pageId}`)
            .then((databaseResponse) => {
                if (databaseResponse.data.length > 0) {
                    this.setState({ isAdmin: true })
                }
            })

            .catch(e => console.log(e))
    }

    fetchMember = () => {

        const { profileId, pageId } = this.props

        axios.get(`${URL}/fetch_profiles?profile_id=${profileId}`)
            .then((databaseResponse) => {
                this.setState({ profile: databaseResponse.data[0] })
                this.checkIfAdmin(profileId, pageId)
            })

            .catch(e => console.log(e))
    }

    componentDidMount = () => {
        this.fetchMember()
    }

    render() {
        const { profile, isAdmin } = this.state
        const { isSignedInUserAdmin } = this.props
        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { adminActivePage, toggleAdminActive } = value

                    return (
                        <div style={pageStyle}>
                            {profile &&
                                <Container>
                                    <Label
                                        as={Link} 
                                        to={`/profile?profile_id=${profile.profile_id}`}
                                        size={'large'}
                                        color={'grey'} >
                                        {profile.fname + ' ' + profile.lname}
                                        {isAdmin && <Label.Detail> Admin </Label.Detail>}
                                    </Label>
                                    {isSignedInUserAdmin &&
                                        <Checkbox
                                            style={checkboxStyle}
                                            slider
                                            checked={isAdmin}
                                            onChange={() => this.changeAdmin()} />
                                    }
                                </Container>
                            }
                        </div>
                    )
                }}
            </HomeContext.Consumer>

        )
    }
}

export default Member