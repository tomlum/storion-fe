import deepmerge from "deepmerge"

let defaultState = {
	user: null,
	test: 1,
	desk: {
		articles: []
	}
}

if (process.env.REACT_APP_DEBUG_API){
	defaultState = {
  user: {
    given_name: 'Tom',
    family_name: 'Lum',
    nickname: 'tomlumperson',
    name: 'Tom Lum',
    picture: 'https://lh5.googleusercontent.com/-NDk28sQy_go/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbCLSRPUtQyvPxXJdPFTRNw-zHVTag/mo/photo.jpg',
    locale: 'en',
    updated_at: '2018-11-20T03:52:03.562Z',
    email: 'tomlumperson@gmail.com',
    email_verified: true,
    iss: 'https://storion.auth0.com/',
    sub: 'google-oauth2|115889101139549307667',
    aud: 'hY12ni5WIxWQy3hziKLRtQLvHdOflzoL',
    iat: 1542774302,
    exp: 1542810302,
    at_hash: 'IU-iVcRBhazrDb22HidGDg',
    nonce: 'm~lQAH91toZ8oCk_lqNiL3VyvjKr0eRM'
  },
  test: 1,
  desk: {
    articles: [
      {
        id: 1,
        owner: 'tomlumperson@gmail.com',
        headline: 'Rockstar says they work 100 hour weeks',
        link: 'http://www.vulture.com/2018/10/the-making-of-rockstar-games-red-dead-redemption-2.html',
        time: '2018-10-14T16:00:00.000Z',
        storyID: 1
      },
      {
        id: 2,
        owner: 'tomlumperson@gmail.com',
        headline: 'Rockstar clarifies some work 100 hour weeks',
        link: 'https://kotaku.com/we-were-working-100-hour-weeks-red-dead-redemption-2-h-1829758281',
        time: '2018-10-15T16:00:00.000Z',
        storyID: 1
      },
      {
        id: 3,
        owner: 'tomlumperson@gmail.com',
        headline: 'Rockstar lifts social media ban',
        link: 'https://www.kotaku.com.au/2018/10/red-dead-redemption-2-developers-speak-out-after-rockstar-lifts-social-media-ban/',
        time: '2018-10-19T16:00:00.000Z',
        storyID: 1
      }
    ]
  }
}
}

function setters(state = {}, action) {
	return deepmerge(state, action.values)
}

export default function main(state = defaultState, action) {
	if (action.SET) {
		return setters(state, action)
	} else {
		return state
	}
}
