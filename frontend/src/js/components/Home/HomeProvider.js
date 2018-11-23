import React from 'react'

export const HomeContext = React.createContext()

class HomeProvider extends React.Component {

    state = {
        signedInUser: null,
        adminActive: false,
        adminActivePage: null,
        logOut: false
    }

    toggleAdminActive = (page) => {
        const { adminActive } = this.state

        if (adminActive) {
            localStorage.removeItem('adminActivePage')
            this.setState({ adminActive: false, adminActivePage: null })
        }
        else {
            localStorage.setItem('adminActivePage', JSON.stringify(page))
            this.setState({ adminActive: true, adminActivePage: page })
        }
    }

    signOut = () => {
        localStorage.removeItem('signedInUser')
        localStorage.removeItem('adminActivePage')
        this.setState({ logOut: true })
    }

    componentDidMount = () => {
        const signedInUser = JSON.parse(localStorage.getItem('signedInUser'))
        const adminActivePage = JSON.parse(localStorage.getItem('adminActivePage'))
        this.setState({ 
            signedInUser: signedInUser, 
            adminActive: adminActivePage ? true : false, 
            adminActivePage: adminActivePage 
        })
    }

    render() {
        return (
            <HomeContext.Provider
                value={
                    {
                        logOut: this.state.logOut,
                        signedInUser: this.state.signedInUser,
                        adminActive: this.state.adminActive,
                        adminActivePage: this.state.adminActivePage,
                        toggleAdminActive: (page) => this.toggleAdminActive(page),
                        signOut: () => this.signOut()
                    }
                }>
                {this.props.children}
            </HomeContext.Provider>
        )
    }
}

export default HomeProvider