import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'

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
