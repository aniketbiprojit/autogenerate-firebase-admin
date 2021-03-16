import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFirestore, useFirestoreDocData } from 'reactfire'

import _ from 'lodash'

// import {} from 'firebase'
import firebase from 'firebase'

import config from '../firebase_config.json'

if (firebase.apps.length === 0) {
	firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export const Editable: React.FC<{
	text: string
	firebase_collection: string
	firebase_id: string
	path: string
}> = ({ text, path, firebase_collection, firebase_id }) => {
	const [clicked, setClicked] = useState<boolean>(false)

	return (
		<Fragment>
			{clicked ? (
				<UpdateComponent
					text={text}
					setClicked={() => setClicked(!clicked)}
					firebase_collection={firebase_collection}
					firebase_id={firebase_id}
					path={path}
				/>
			) : (
				// UpdateComponent(text, setClicked, clicked, firebase_collection, firebase_id, path)
				<div onClick={() => setClicked(!clicked)} className='' style={{ minHeight: '20px' }}>
					<p style={{ width: '220px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</p>
				</div>
			)}
		</Fragment>
	)
}

const UpdateComponent: React.FC<{
	text: string
	setClicked: CallableFunction

	firebase_collection: string
	firebase_id: string
	path: string
}> = ({ text, setClicked, firebase_collection, firebase_id, path }) => {
	const [text_data, setTextData] = useState(text)

	const documentReference = useFirestore().collection(firebase_collection).doc(firebase_id)
	const { status, data } = useFirestoreDocData(documentReference)

	if (status === 'loading') {
		console.log(status)
	} else {
		console.log(status)
		// console.log(data)
	}

	async function handleSubmit() {
		// console.log(_.get(data, path))
		console.log(_.set(data as any, path, text_data))
		// console.log(_.get(data, path))
		// console.log(data)
		console.log(
			await firestore
				.collection(firebase_collection)
				.doc(firebase_id)
				.update(data as any)
		)
		setClicked()
	}

	return (
		<Fragment>
			<textarea
				cols={20}
				rows={10}
				onChange={(e) => {
					setTextData(e.target.value)
				}}
				value={text_data}
			></textarea>
			<Button
				onClick={() => {
					handleSubmit()
				}}
				variant='primary'
			>
				Submit
			</Button>{' '}
		</Fragment>
	)
}
