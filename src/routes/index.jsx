import { Fragment, lazy, Suspense, useEffect } from 'react';

// Utils
import NProgress from 'nprogress';

// Router
import { Redirect, Route, Switch } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core';

// Layouts
import { AuthLayout, HomeLayout, LoadingLayout } from '../layouts';

// ----------------------------------------------------------------------

function RouteProgress(props) {
	nprogressStyle();

	NProgress.configure({
		speed: 500,
		showSpinner: false
	});

	useEffect(() => {
		NProgress.done();
		return () => {
			NProgress.start();
		};
	}, []);

	return <Route {...props} />;
}

const routes = {
	home: {
		exact: true,
		path: '/',
		layout: HomeLayout,
		component: lazy(() => import('../pages/Home'))
	},
	login: {
		exact: true,
		path: '/auth',
		layout: AuthLayout,
		component: lazy(() => import('../pages/Auth'))
	},
	redirect: {
		component: () => <Redirect to='/' />
	}
};

export default routes;

// ----------------------------------------------------------------------

export function RenderRoutes() {
	return (
		<Suspense fallback={<LoadingLayout />}>
			<Switch>
				{Object.values(routes).map((route, index) => {
					const Layout = route.layout || Fragment;
					const Component = route.component;
					return (
						<RouteProgress
							key={index}
							path={route.path}
							exact={route.exact}
							render={(props) => (
								<Layout>
									<Component {...props} />
								</Layout>
							)}
						/>
					);
				})}
			</Switch>
		</Suspense>
	);
}

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme) => ({
	'@global': {
		'#nprogress': {
			pointerEvents: 'none',
			'& .bar': {
				top: 0,
				left: 0,
				height: 2,
				width: '100%',
				position: 'fixed',
				zIndex: theme.zIndex.snackbar,
				backgroundColor: theme.palette.primary.main,
				boxShadow: `0 0 2px ${theme.palette.primary.main}`
			},
			'& .peg': {
				right: 0,
				opacity: 1,
				width: 100,
				height: '100%',
				display: 'block',
				position: 'absolute',
				transform: 'rotate(3deg) translate(0px, -4px)',
				boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
			}
		}
	}
}));
