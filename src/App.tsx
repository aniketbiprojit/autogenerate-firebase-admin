import React, { Fragment } from 'react'

import 'firebase/firestore'
import { FirebaseAppProvider, useFirestore, useFirestoreCollectionData } from 'reactfire'

import './App.css'

import config from './firebase_config.json'

const Tester: React.FC = () => {
	const burritoRef = useFirestore().collection('competitions')

	const { status, data } = useFirestoreCollectionData(burritoRef)
	if (status === 'loading') {
		return <p>Fetching Data</p>
	} else {
		console.log(data)
		return (
			<Fragment>
				<table>
					<thead>
						<tr>
							{Object.keys(data?.[0])
								.sort()
								.map((elem) => {
									return <th>{elem}</th>
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
												<Fragment>
													<td>
														<img style={{ height: '100px' }} src={elem[key] as string} alt='' />
													</td>
												</Fragment>
											)
										} else
											return (
												<Fragment>
													<td>{elem[key] as string}</td>
												</Fragment>
											)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
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
