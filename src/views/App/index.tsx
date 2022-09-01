import React from 'react';

import {
	Routes,
	Route,
	useLocation,
	useNavigate,
} from 'react-router-dom';

import { Layout } from 'antd';

require('antd/lib/layout/style');

import MainHeader from '../../components/headers/MainHeader';
import route from '../../features/ui/route';
import './App.css';
import ListDatabase from '../ListDatabase';
import { useDispatch, useSelector } from 'react-redux';
import DatabaseView from '../DatabaseView';
import { StoreState } from '../../store';
import logger from '../../utils/logger';

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const path = useSelector<StoreState, StoreState['ui']['path']>( s => s.ui.path );
	const isRouted = useSelector<StoreState, StoreState['ui']['isRouted']>( s => s.ui.isRouted );

	React.useEffect( () => {
		if (location && !isRouted && location.pathname !== path ) { 
			dispatch(route(location.pathname));
			logger.info({'location': location}, `Location changed but doesn't match path and "isRouted" flag is set to false. Routing to new location`);
		}
	}, [location]);

	React.useEffect( () => {
		if (path !== location?.pathname && isRouted) {
			navigate(path);
			logger.info({'path': path}, `Path changed but doesn't match location and "isRouted" flag is set to true. Navigating to new path`);
		}
	}, [path]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<MainHeader title="DBManager"/>
				<Routes>
					<Route path="/" element={<ListDatabase/>} />
					<Route path="/db">
						<Route path=":databaseName" element={<DatabaseView/>} />
					</Route>
				</Routes>
		</Layout>);
}

export default App;
