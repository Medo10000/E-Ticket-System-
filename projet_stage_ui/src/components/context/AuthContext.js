import React, { Component, useContext } from 'react'

const AuthContext = React.createContext()

class AuthProvider extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    const user = localStorage.getItem('user')
    this.setState({ user })
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  userIsAuthenticated = () => {
    return localStorage.getItem('user') !== null
  }

  userIsAdmin = () => {
    return JSON.parse(localStorage.getItem('user.roles.name') === 'ROLE_ADMIN')
  }

  userIsDev = () => {
    return JSON.parse(localStorage.getItem('user.roles.name') === 'DEV_ADMIN')
  }

  userIsClient = () => {
    return JSON.parse(localStorage.getItem('user.roles.name') === 'ROLE_USER')
  }

  userLogin = user => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({ user })
  }

  userLogout = () => {
    localStorage.removeItem('user')
    this.setState({ user: null })
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { getUser, userIsAuthenticated, userIsAdmin, userIsDev, userIsClient, userLogin, userLogout } = this

    return (
      <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userIsAdmin, userIsDev, userIsClient, userLogin, userLogout, }}>
        {children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContext

export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }