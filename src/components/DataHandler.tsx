import React, { Fragment } from 'react'
import { ArrayHandler } from './Uploadable'
import { ObjectHandler } from './ObjectHandler'
import { Editable } from './Editable'

export const DataHandler: React.FC<{ data: any; path: string; firebase_collection: string; firebase_id: string }> = ({
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
