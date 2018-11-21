import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import URL from '../../../BackendUrl'
import { Search, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const containerStyle = {
    width: '30%'
}

class SearchBar extends React.Component {

    constructor() {
        super()
        this.credentials = null
    }

    fetchProfileCredentials = () => {

        axios.get(`${URL}/fetch_profiles`)
            .then( (databaseResponse) => {

                const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))

                const profiles = databaseResponse.data

                let credentials = this.credentials || []

                for (let i = 0; i < profiles.length; i++) {

                    if (signedInUser.profile_id == profiles[i].profile_id) {
                        continue
                    }

                    const profile = {
                        profile_id: profiles[i].profile_id,
                        account_id: profiles[i].account_id,
                        title: profiles[i].fname + ' ' + profiles[i].lname,
                        image: `https://ui-avatars.com/api/?name=${profiles[i].fname + ' ' + profiles[i].lname}`,
                        description: 'Profile'
                    }

                    credentials.push(profile)

                }

                this.credentials = credentials
            })
            .catch( (error) => console.log(error) )
    }

    fetchPageCredentials = () => {

        axios.get(`${URL}/fetch_pages`)
            .then( (databaseResponse) => {
                const pages = databaseResponse.data

                let credentials = this.credentials || []

                for (let i = 0; i < pages.length; i++) {

                    const page = {
                        page_id: pages[i].page_id,
                        account_id: pages[i].account_id,
                        title: pages[i].page_name,
                        image: `https://ui-avatars.com/api/?name=${pages[i].page_name}`,
                        description: 'Page'
                    }

                    credentials.push(page)

                }

                this.credentials = credentials
            })
            .catch( (error) => console.log(error) )
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title, selectedProfile: result.profile_id, selectedPage: result.page_id })

        const { fromProfile, fromPage } = this.props

        if (fromProfile) {
            this.props.fetchProfile(result.profile_id)
        }

        if (fromPage) {
            this.props.fetchPage(result.page_id)
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(this.credentials, isMatch)
            })

        }, 300)
    }

    componentWillMount() {
        this.resetComponent()
        this.fetchProfileCredentials()
        this.fetchPageCredentials()
    }

    render() {

        const { isLoading, value, results, selectedProfile, selectedPage } = this.state
        const { fromProfile, fromPage } = this.props

        if (selectedProfile && !fromProfile) {
            return <Redirect push to={"/profile?profile_id="+selectedProfile} />
        }
        if (selectedPage && !fromPage) {
            return <Redirect push to={"/page?page_id="+selectedPage} />
        }

        return (
            <Container style={containerStyle}>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    input={{ width: '50%', placeholder: 'Enter Page Name or Profile Name' }}
                    fluid
                />
            </Container>
        )
    }
}

export default SearchBar