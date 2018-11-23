import React, { Component } from 'react'
import axios from 'axios'
import URL from '../../../BackendUrl'
import { Form, Input, Button, Select, TextArea } from 'semantic-ui-react'
import { HomeContext } from './HomeProvider'

const labelStyle = {
    float: 'left'
}

class NewPage extends Component {
    state = {
        name: '',
        description: '',
        categories: null,
        newCategory: '',
        chosenCategory: null,
        memberAdded: false,
        adminAdded: false
    }

    fetchCategories = () => {
        axios.get(`${URL}/fetch_categories`)
            .then((databaseResponse) => {
                const categoriesFromDatabase = databaseResponse.data
                let categories = []
                for (let i = 0; i < categoriesFromDatabase.length; i++) {
                    const category = {
                        key: categoriesFromDatabase[i].category_id,
                        value: categoriesFromDatabase[i].category_id,
                        text: categoriesFromDatabase[i].category_description
                    }
                    categories.push(category)
                }
                this.setState({ categories: categories })
            })

            .catch(e => console.log(e))
    }

    createNewCategory = (signedInUser) => {
        const { newCategory } = this.state

        if (newCategory.length == 0) {
            this.createAccount(signedInUser)
            return
        }

        axios.post(`${URL}/create_category`, {
            category_description: newCategory,
        })
            .then((databaseResponse) => {

                this.setState({ chosenCategory: databaseResponse.data[0].category_id }, () => this.createAccount(signedInUser))

                console.log('category created', databaseResponse.data[0].category_description)
            })
            .catch((error) => console.log(error))
    }

    categorySelectHandler = (e, { value, text }) => {
        this.setState({
            chosenCategory: value
        })
    }

    addAdmin = (page_id, profile_id) => {
        axios.post(`${URL}/create_admin`, {
            page_id: page_id,
            profile_id: profile_id
        })
            .then(() => {
                this.setState({ adminAdded: true })
                console.log('admin created')
            })
            .catch((error) => console.log(error))
    }

    addMember = (page_id, profile_id) => {
        axios.post(`${URL}/create_member`, {
            page_id: page_id,
            profile_id: profile_id
        })
            .then(() => {
                this.setState({ memberAdded: true })
                console.log('member added created')
            })
            .catch((error) => console.log(error))
    }

    createPage = (account_id, signedInUser) => {
        const { name, chosenCategory, description } = this.state

        console.log(name, chosenCategory, description, account_id)

        axios.post(`${URL}/create_page`, {
            page_name: name,
            category: chosenCategory,
            description: description,
            account_id: account_id
        })
            .then((databaseResponse) => {
                const page_id = databaseResponse.data[0].page_id
                console.log('page created', page_id)

                this.addMember(page_id, signedInUser.profile_id)
                this.addAdmin(page_id, signedInUser.profile_id)

            })
            .catch((error) => console.log(error))
    }

    createAccount = (signedInUser) => {
        axios.post(`${URL}/create_account`, {
            account_type: 'page'
        })
            .then((databaseResponse) => {
                const account_id = databaseResponse.data[0].account_id
                console.log('account created', account_id)

                this.createPage(account_id, signedInUser)
                
            })
            .catch((error) => console.log(error))
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {
        this.fetchCategories()
    }

    componentDidUpdate = () => {
        const { memberAdded, adminAdded } = this.state
        const { doneAddingPage } = this.props
        if (memberAdded && adminAdded) {
            doneAddingPage()
        }
    }

    render() {
        const { categories, chosenCategory, newCategory, name, description } = this.state
        return (
            <HomeContext.Consumer>
                {(value) => {
                    const { signedInUser } = value
                    return (
                        <Form>
                            <Form.Field required>
                                <label style={labelStyle}>Page Name</label>
                                <Input
                                    name={'name'}
                                    value={name}
                                    onChange={this.handleInputChange} />

                            </Form.Field>

                            <Form.Field>
                                <label style={labelStyle}>Category</label>
                                {categories &&
                                    <Select
                                        // text={chosenCategory}
                                        options={categories}
                                        onChange={this.categorySelectHandler} />
                                }
                                <Input
                                    name={'newCategory'}
                                    type={'text'}
                                    value={newCategory}
                                    placeholder={'New Category'}
                                    onChange={this.handleInputChange} />
                            </Form.Field>


                            <Form.Field required>
                                <label style={labelStyle}>Page Description</label>
                                <TextArea
                                    autoHeight
                                    value={description}
                                    name='description'
                                    onChange={e => this.handleInputChange(e)} />
                            </Form.Field>

                            <Form.Field>
                                <Button
                                    type={'button'}
                                    disabled={(name.length == 0 || description.length == 0)}
                                    onClick={() => this.createNewCategory(signedInUser)}>
                                    Create
                                </Button>
                                <Button
                                    type={'button'}
                                    onClick={() => this.props.cancelNewPage(signedInUser)}>
                                    Cancel
                                </Button>
                            </Form.Field>
                        </Form>
                    )
                }}
            </HomeContext.Consumer>

        )
    }
}

export default NewPage