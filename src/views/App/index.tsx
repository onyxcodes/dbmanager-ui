import React from 'react';

import {
	HashRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import { Layout } from 'antd';

require('antd/lib/layout/style');

import MainHeader from '../../components/headers/MainHeader';

import './App.css';
import ListDatabase from '../ListDatabase';
import { useDispatch } from 'react-redux';

const App = () => {
	
	return (<div id="app">
		<Router>
		<Layout style={{ minHeight: '100vh' }}>
			<MainHeader title="DBManager"/>
				<Routes>
					<Route path="/" element={<ListDatabase/>} />
					<Route path="/class" element={<h2>Class</h2>}/>
				</Routes>
		</Layout>
		</Router>
	</div>);
}

export default App;
