import Main from './pages/layouts/Main'
import Blank from './pages/layouts/Blank'
import Home from './pages/Home'
import Login from './pages/Login'
import SaleManager from './pages/SaleManager'

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
			component: SaleManager,
			layout: Main
		}
	],
	WithoutSession: [
		{
			path: '/login',
			exact: true,
			component: Login,
			layout: Blank
		}
	]
}

export default routes