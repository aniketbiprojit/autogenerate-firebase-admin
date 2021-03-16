import React, { Fragment } from 'react'

import 'firebase/firestore'
import { FirebaseAppProvider } from 'reactfire'

import './App.css'

import config from './firebase_config.json'
import { Tester } from './components/TableComponent'

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
