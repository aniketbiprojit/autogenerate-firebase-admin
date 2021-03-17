import React, { Fragment, useEffect, useState } from 'react'

import 'firebase/firestore'

import './App.css'

import config from './firebase_config.json'
import { Tester } from './components/TableComponent'

import firebase from 'firebase'
import { Button } from 'react-bootstrap'

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

const App: React.FC = () => {
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
	// setInterval(() => {
	// 	console.log(firebase.auth().currentUser)
	// }, 1000)
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
						setLoggedIn(true)
					}}
				>
					Logout
				</Button>
			)}
			<Tester collection_name='items'></Tester>
		</Fragment>
	)
}

export default App
