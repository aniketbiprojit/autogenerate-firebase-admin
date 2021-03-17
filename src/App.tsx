import React, { Fragment, useEffect, useState } from 'react'

import 'firebase/firestore'

import './App.css'

import config from './firebase_config.json'
import { Tester } from './components/TableComponent'

import firebase from 'firebase'
import { Button } from 'react-bootstrap'

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

if (firebase.apps.length === 0) {
	firebase.initializeApp(config)
}

export const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
	auth.signInWithPopup(googleProvider)
		.then((res) => {
			console.log(res.user)
		})
		.catch((error) => {
			console.log(error.message)
		})
}

const App: React.FC<{ collections: Array<string> }> = ({ collections }) => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [email, setEmail] = useState('')
	useEffect(() => {
		const interval = setInterval(() => {
			const user = firebase.auth().currentUser
			if (user) {
				clearInterval(interval)
				setLoggedIn(true)
				console.log(user.uid)
				if (user.email) setEmail(user.email)
			}
		}, 1000)
		return () => {}
	}, [])

	return (
		<Fragment>
			<p>{email}</p>
			{!loggedIn ? (
				<Button onClick={signInWithGoogle}>Login</Button>
			) : (
				<Button
					onClick={async () => {
						try {
							await auth.signOut()
						} catch (err) {
							console.error(err)
						}
						setLoggedIn(false)
					}}
				>
					Logout
				</Button>
			)}
			<Router basename='/home'>
				<Switch>
					<Route path='/' exact>
						{loggedIn && <Fragment>{Header(collections)}</Fragment>}
					</Route>
					{loggedIn &&
						collections.map((elem) => {
							return (
								<Route path={`/${elem}`}>
									{Header(collections)}
									<Tester collection_name={elem}></Tester>
								</Route>
							)
						})}
				</Switch>
			</Router>
		</Fragment>
	)
}

export default App

function Header(collections: string[]) {
	return (
		<ul>
			{collections.map((elem) => {
				return (
					<li>
						<Link to={`/${elem}`}>{elem.toUpperCase()}</Link>
					</li>
				)
			})}
		</ul>
	)
}
