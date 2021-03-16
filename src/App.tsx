import React, { Fragment } from 'react'

import 'firebase/firestore'
import { FirebaseAppProvider, useFirestore, useFirestoreCollectionData } from 'reactfire'

import './App.css'

import config from './firebase_config.json'
import { Table } from 'react-bootstrap'

const Uploadable: React.FC = ({ children }) => {
	return <Fragment>{children}</Fragment>
}

const Editable: React.FC<{ text: string }> = ({ children, text }) => {
	return <Fragment>{text}</Fragment>
}

const Tester: React.FC = () => {
	const data_ref = useFirestore().collection('competitions')

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
										if (key === 'image') {
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
														<Editable text={elem[key] as string}></Editable>
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
				<Tester></Tester>
			</FirebaseAppProvider>
		</Fragment>
	)
}

export default App
