import React, { Fragment, useState } from 'react'

import 'firebase/firestore'
import { FirebaseAppProvider, useFirestore, useFirestoreCollectionData } from 'reactfire'

import './App.css'

import config from './firebase_config.json'
import { Table, Button } from 'react-bootstrap'

const Uploadable: React.FC = ({ children }) => {
	return <Fragment>{children}</Fragment>
}

const ArrayHandler: React.FC<{ arr_data: Array<any>; path: string; firebase_collection: string; firebase_id: string }> = ({
	arr_data,
	firebase_collection,
	firebase_id,
	path,
}) => {
	// console.log(typeof arr_data?.[0] === 'object')
	if (path === 'images') {
		return (
			<Fragment>
				{arr_data.map((data, idx) => {
					return (
						<Uploadable>
							<img style={{ width: '100%', maxWidth: '20	0px' }} src={data as string} alt='' />
						</Uploadable>
					)
				})}
			</Fragment>
		)
	} else
		return (
			<Fragment>
				{arr_data.map((data, idx) => {
					return <DataHandler firebase_collection={firebase_collection} firebase_id={firebase_id} data={data} path={path + '/idx_' + idx} />
				})}
			</Fragment>
		)
}

const ObjectHandler: React.FC<{ path: string; obj_data: any; firebase_collection: string; firebase_id: string }> = ({
	obj_data,
	firebase_collection,
	path,
	firebase_id,
}) => {
	const keys = Object.keys(obj_data).sort()
	return (
		<Fragment>
			<Table striped bordered hover>
				<thead>
					<tr>
						{keys.map((elem) => {
							return <th key={elem}>{elem}</th>
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						{keys.map((key) => {
							return (
								<td>
									<Editable
										path={path + '/' + key}
										firebase_collection={firebase_collection}
										firebase_id={firebase_id}
										text={obj_data[key] as string}
									></Editable>
								</td>
							)
						})}
					</tr>
				</tbody>
			</Table>
		</Fragment>
	)
}

const DataHandler: React.FC<{ data: any; path: string; firebase_collection: string; firebase_id: string }> = ({
	data,
	firebase_collection,
	firebase_id,
	path,
}) => {
	if (typeof data !== 'object') {
		return <Editable path={path} firebase_collection={firebase_collection} firebase_id={firebase_id} text={data as string}></Editable>
	}
	if (data instanceof Array) {
		return (
			<Fragment>
				<td>
					<ArrayHandler path={path} firebase_collection={firebase_collection} firebase_id={firebase_id} arr_data={data}></ArrayHandler>
				</td>
			</Fragment>
		)
	} else return <ObjectHandler path={path} firebase_collection={firebase_collection} firebase_id={firebase_id} obj_data={data}></ObjectHandler>
}

const Editable: React.FC<{
	text: string
	firebase_collection: string
	firebase_id: string
	path: string
}> = ({ text, path, firebase_collection, firebase_id }) => {
	const [clicked, setClicked] = useState<boolean>(false)
	return (
		<Fragment>
			{clicked ? (
				<Fragment>
					<textarea cols={20} rows={10} defaultValue={text}></textarea>
					<Button
						onClick={() => {
							setClicked(!clicked)
							console.log(firebase_collection, firebase_id, path)
						}}
						variant='primary'
					>
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
	const images_single = ['svgSrc', 'image']

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
										// console.log(key in images_single, images_single, key)
										if (images_single.includes(key)) {
											return (
												<Fragment key={elem[key] as string}>
													<td style={{ width: '200px', maxWidth: '200px' }}>
														<Uploadable>
															<img style={{ width: '100%' }} src={elem[key] as string} alt='' />
														</Uploadable>
													</td>
												</Fragment>
											)
										} else if (typeof elem[key] !== 'object')
											return (
												<Fragment key={elem[key] as string}>
													<td style={{ maxWidth: '250px', width: '250px' }}>
														{key === 'NO_ID_FIELD' ? (
															(elem[key] as string)
														) : (
															<Editable
																path={key}
																firebase_collection={collection_name}
																firebase_id={elem['NO_ID_FIELD'] as string}
																text={elem[key] as string}
															></Editable>
														)}
													</td>
												</Fragment>
											)
										else {
											return (
												<Fragment>
													<DataHandler
														path={key}
														firebase_collection={collection_name}
														firebase_id={elem['NO_ID_FIELD'] as string}
														data={elem[key] as any}
													></DataHandler>
												</Fragment>
											)
										}
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
				<Tester collection_name='items'></Tester>
			</FirebaseAppProvider>
		</Fragment>
	)
}

export default App
