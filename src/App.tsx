import React, { Fragment, useState } from 'react'

import 'firebase/firestore'
import { FirebaseAppProvider, useFirestore, useFirestoreCollectionData } from 'reactfire'

import './App.css'

import config from './firebase_config.json'
import { Table, Button } from 'react-bootstrap'

const Uploadable: React.FC = ({ children }) => {
	return <Fragment>{children}</Fragment>
}

const Editable: React.FC<{
	text: string
	firebase_collection: string
	firebase_id: string
}> = ({ text }) => {
	const [clicked, setClicked] = useState<boolean>(false)
	return (
		<Fragment>
			{clicked ? (
				<Fragment>
					<textarea cols={20} rows={10}>
						{text}
					</textarea>
					<Button onClick={() => setClicked(!clicked)} variant='primary'>
						Submit
					</Button>{' '}
				</Fragment>
			) : (
				<div onClick={() => setClicked(!clicked)} className='' style={{ minHeight: '20px' }}>
					<p style={{ width: '220px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</p>
				</div>
			)}
		</Fragment>
	)
}

const Tester: React.FC<{ collection_name: string }> = ({ collection_name }) => {
	const data_ref = useFirestore().collection(collection_name)

	const { status, data } = useFirestoreCollectionData(data_ref)
	if (status === 'loading') {
		return <p>Fetching Data</p>
	} else {
		console.log(data)
		return (
			<Fragment>
				<Table striped bordered hover>
					<thead>
						<tr>
							{Object.keys(data?.[0])
								.sort()
								.map((elem) => {
									return <th key={elem}>{elem}</th>
								})}
						</tr>
					</thead>
					<tbody>
						{data.map((elem) => {
							const keys = Object.keys(data?.[0]).sort()
							return (
								<tr key={(elem['NO_ID_FIELD'] as string) ?? ''}>
									{keys.map((key) => {
										if (key === 'image' || key === 'svgSrc') {
											return (
												<Fragment key={elem[key] as string}>
													<td style={{ maxWidth: '200px' }}>
														<Uploadable>
															<img style={{ width: '100%' }} src={elem[key] as string} alt='' />
														</Uploadable>
													</td>
												</Fragment>
											)
										} else
											return (
												<Fragment key={elem[key] as string}>
													<td style={{ maxWidth: '200px' }}>
														{key === 'NO_ID_FIELD' ? (
															(elem[key] as string)
														) : (
															<Editable
																firebase_collection={collection_name}
																firebase_id={elem['NO_ID_FIELD'] as string}
																text={typeof elem[key] === 'object' ? '' : (elem[key] as string)}
															></Editable>
														)}
													</td>
												</Fragment>
											)
									})}
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Fragment>
		)
	}
}

const App: React.FC = () => {
	return (
		<Fragment>
			<FirebaseAppProvider firebaseConfig={config}>
				<Tester collection_name='data'></Tester>
			</FirebaseAppProvider>
		</Fragment>
	)
}

export default App
