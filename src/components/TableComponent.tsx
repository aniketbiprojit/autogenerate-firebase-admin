import React, { Fragment } from 'react'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { Table } from 'react-bootstrap'
import { Uploadable } from './Uploadable'
import { DataHandler } from './DataHandler'
import { Editable } from './Editable'
import { Deletable } from './Deletable'

export const Tester: React.FC<{ collection_name: string }> = ({ collection_name }) => {
	const data_ref = useFirestore().collection(collection_name)
	const images_single = ['svgSrc', 'image']

	const { status, data } = useFirestoreCollectionData(data_ref)
	if (status === 'loading') {
		return <p>Fetching Data</p>
	} else {
		// console.log(data)
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
															<img style={{ width: '100px' }} src={elem[key] as string} alt='' />
														</Uploadable>
													</td>
												</Fragment>
											)
										} else if (typeof elem[key] !== 'object')
											return (
												<Fragment key={elem[key] as string}>
													<td style={{ maxWidth: '250px', width: '250px' }}>
														{key === 'NO_ID_FIELD' ? (
															<Fragment>
																<p>{elem[key] as string}</p>
																<Deletable firebase_collection={collection_name} firebase_id={elem[key] as string} />
															</Fragment>
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
