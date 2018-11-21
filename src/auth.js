import auth0 from "auth0-js"
import axios from "axios"

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: "token id_token",
      scope: "email openid profile"
    })

    this.getUser = this.getUser.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  nullUser = { null: true }

  getUser() {
    return this.profile
  }

  getIdToken() {
    return this.idToken
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt
  }

  signIn() {
    this.auth0.authorize()
  }
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err)
        if (!authResult || !authResult.idToken) {
          return reject(err)
        }
        this.setSession(authResult)
        resolve()
      })
    })
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
  }

  signOut() {
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH0_RETURN_TO,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
    })
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err)
        this.setSession(authResult)
        resolve()
      })
    })
  }
}

const auth0Client = new Auth()

function authHeader() {
  return { headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` } }
}

export async function authGet(path) {
  return axios.get(path, authHeader())
}

export default auth0Client
