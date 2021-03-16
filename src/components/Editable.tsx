import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'

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
					setClicked={setClicked}
					clicked={clicked}
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
	clicked: boolean
	firebase_collection: string
	firebase_id: string
	path: string
}> = ({ text, setClicked, clicked, firebase_collection, firebase_id, path }) => {
	const documentReference = useFirestore().collection(firebase_collection).doc(firebase_id)
	const { status, data } = useFirestoreDocDataOnce(documentReference)
	if (status === 'loading') {
		console.log(status)
	} else {
		console.log(status)
		console.log(data)
	}

	async function handleSubmit() {
		// setClicked(!clicked)}
		console.log(data)
	}

	return (
		<Fragment>
			<textarea cols={20} rows={10} defaultValue={text}></textarea>
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
