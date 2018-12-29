import Main from '../app/pages/layouts/Main'
import Blank from '../app/pages/layouts/Blank'
import Home from '../app/pages/Home'
import Login from '../app/pages/Login'
import Sales from '../app/pages/Sales'

const routes = {
	Privates: [
		{
			path: '/',
			exact: true,
			component: Home,
			layout: Main
		},
		{
			path: '/ventas',
			exact: true,
			component: Sales,
			layout: Main
		}
	],
	PublicsWithoutSession: [
		{
			path: '/login',
			exact: true,
			component: Login,
			layout: Blank
		}
	]
}

export default routes