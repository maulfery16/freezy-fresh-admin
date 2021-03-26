/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './styles/colors.css';
import './styles/global.css';

import AtomSpinner from './components/atoms/spinner';
import OrganismErrorBoundary from './components/organisms/error-boundary';
import routes from './routes';
import { setAuthToken, setLoginStatus } from './stores/auth/actions';

import AuthService from './services/auth';
const authService = new AuthService();

const App = () => {
	const { isLoggedIn, isRememberMe, refreshToken } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const renderedRoutes = [];

	const generateChildrenRoute = (children, parentPath) => {
		children.forEach((child) => {
			if (child.children) {
				generateChildrenRoute(
					child.children,
					`${parentPath}${child.path}`
				);
			} else {
				renderedRoutes.push(generateRoute(child, parentPath));
			}
		});
	};

	const requestRefreshToken = async () => {
		try {
			const { access_token } = await authService.reqRefreshToken({
				refreshToken,
			});

			dispatch(setAuthToken(access_token));
			dispatch(setLoginStatus(true));
			window.location = '/';
		} catch (error) {
			console.error(error);
		}
	};

	const generateRoute = (route, pathPrefix) => (
		<Route
			key={route.name}
			path={pathPrefix ? `${pathPrefix}${route.path}` : route.path}
			exact={route.exact}
			name={route.name}
			render={(props) => {
				if (route.guard) {
					return isLoggedIn ? (
						<route.component key={route.name} {...props} />
					) : isRememberMe ? (
						requestRefreshToken()
					) : (
						<Redirect key={`login-redirect`} to="/login" />
					);
				} else {
					return <route.component key={route.name} {...props} />;
				}
			}}
		/>
	);

	const renderRoutes = () => {
		routes.forEach((route) => {
			if (route.children) {
				generateChildrenRoute(route.children, route.path);
			} else {
				renderedRoutes.push(generateRoute(route));
			}
		});

		return renderedRoutes.map((route) => route);
	};

	return (
		<div className="App">
			<OrganismErrorBoundary>
				<Switch>
					<Suspense fallback={<AtomSpinner />}>
						{renderRoutes()}
					</Suspense>
					<Redirect to="/" />
				</Switch>
			</OrganismErrorBoundary>
		</div>
	);
};

export default App;
