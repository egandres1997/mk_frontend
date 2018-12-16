import Main from '../app/pages/layouts/Main'
import Blank from '../app/pages/layouts/Blank'
import Home from '../app/pages/Home'
import Login from '../app/pages/Login'

const routes = {
	Privates: [
		{
			path: '/',
			exact: true,
			toRender: Home,
			layout: Main
		}
	],
	Publics: [
		{
			path: '/login',
			exact: true,
			toRender: Login,
			layout: Blank
		}
	]
}

export default routes