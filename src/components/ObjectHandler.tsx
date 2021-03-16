import React, { Fragment } from 'react'
import { Table } from 'react-bootstrap'
import { Editable } from './Editable'

export const ObjectHandler: React.FC<{ path: string; obj_data: any; firebase_collection: string; firebase_id: string }> = ({
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
										path={path + '.' + key}
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
