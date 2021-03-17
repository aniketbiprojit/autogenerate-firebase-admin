import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

import firebase from 'firebase'

const firestore = firebase.firestore()

export const Deletable: React.FC<{
	firebase_collection: string
	firebase_id: string
}> = ({ firebase_collection, firebase_id }) => {
	async function handleDelete() {
		if (window.confirm('Are you sure you want to delete?')) {
			console.log(firebase_collection, firebase_id)
			await firestore.collection(firebase_collection).doc(firebase_id).delete()
			alert('Deleted')
		}
	}

	return (
		<Fragment>
			<Button
				onClick={() => {
					handleDelete()
				}}
				variant='danger'
			>
				Delete
			</Button>
		</Fragment>
	)
}
