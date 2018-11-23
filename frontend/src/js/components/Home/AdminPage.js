import React, { Component } from 'react'
import { Label, Checkbox, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { HomeContext } from './HomeProvider'
import axios from 'axios'
import URL from '../../../BackendUrl'

const pageStyle = {
    marginTop: '15px',
    marginBottom: '15px'
}

const checkboxStyle = {
    marginLeft: '15px'
}

class AdminPage extends Component {
    state = {
        page: null
    }

    fetchPage = (page_id) => {

        const { pageId } = this.props

        axios.get(`${URL}/fetch_pages?page_id=${pageId}`)
            .then((databaseResponse) => {
                this.setState({ page: databaseResponse.data[0] })
            })

            .catch(e => console.log(e))
    }

    componentDidMount = () => {
        this.fetchPage()
    }

    render() {
        const { page } = this.state
        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { adminActivePage, toggleAdminActive } = value

                    return (
                        <div style={pageStyle}>
                            {page &&
                                <Container>
                                    <Label 
                                        as={Link} to={`/page?page_id=${page.page_id}`}
                                        size={'large'}>
                                        {page.page_name}
                                    </Label>
                                    <Checkbox 
                                        style={checkboxStyle} 
                                        slider 
                                        checked={ (adminActivePage && adminActivePage.page_id == page.page_id) ? true : false } 
                                        onChange={ () => toggleAdminActive(page) }/>
                                </Container>
                            }
                        </div>
                    )
                }}
            </HomeContext.Consumer>

        )
    }
}

export default AdminPage