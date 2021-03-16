import React, { Fragment } from 'react'
import { DataHandler } from './DataHandler'

export const Uploadable: React.FC = ({ children }) => {
	return <Fragment>{children}</Fragment>
}
export const ArrayHandler: React.FC<{ arr_data: Array<any>; path: string; firebase_collection: string; firebase_id: string }> = ({
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
							<>
								<img style={{ width: '100px', maxWidth: '100px' }} src={data as string} alt='' />
								<hr />
							</>
						</Uploadable>
					)
				})}
			</Fragment>
		)
	} else
		return (
			<Fragment>
				{arr_data.map((data, idx) => {
					return (
						<DataHandler firebase_collection={firebase_collection} firebase_id={firebase_id} data={data} path={path + '[' + idx + ']'} />
					)
				})}
			</Fragment>
		)
}
