import Vue from 'vue'
import VueRouter from 'vue-router'

// 视图组件
import Blog from '../views/Blog.vue'
import Blog404 from '../views/Blog404.vue'

// 模块组件
import Home from '../views/blog_modules/Home.vue'
import Categories from '../views/blog_modules/Categories.vue'
import About from '../views/blog_modules/About.vue'
import Tags from '../views/blog_modules/Tags.vue'

import Articles from '../components/Home/Articles.vue'

Vue.use(VueRouter)

const routes = [
	//重定向
	{ path: '/', redirect: '/blog'},
	//博客各模块子路由
	{
		path: '/blog',
		name: 'Blog',
		component: Blog,
		children: [
			{
				//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
				//在生成路由时，主路由上的path会被自动添加到子路由之前，
				//所以子路由上的path不用在重新声明主路由上的path了。
				path: 'home',
				name: 'Home',
				component: Home
			},
			{
				path: 'categories',
				name: 'Categories',
				component: Categories
			},
			{
				path: 'tags',
				name: 'Tags',
				component: Tags
			},
			{
				path: 'about',
				name: 'About',
				component: About
			},

			//博客内容详情页路由
			{
				path: 'articles',
				name: 'Articles',
				component: Articles
			},
		]
	},

	// {
	//   path: '/blogdetails/:blogID',
	//   name: 'BlogDetails',
	//   component: BlogDetails
	//   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// },


	// 404页面路由
	{
		path: '*',
		name: 'Blog404',
		component: Blog404
	},
]

const router = new VueRouter({
	routes
})

export default router
