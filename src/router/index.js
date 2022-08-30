import Vue from 'vue'
import VueRouter from 'vue-router'
const Container = r => require.ensure([], () => r(require('../views/Container')))

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Container,
		children: [
			{
				meta: {
					title: '东城妇幼保健院'
				},
				path: '/',
				name: 'Index',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
			},
			{
				meta: {
					title: '选择科室'
				},
				path: '/xzks',
				name: 'Xzks',
				component: () => import(/* webpackChunkName: "about" */ '../views/Xzks.vue')
			},
			{
				meta: {
					title: '选择号源'
				},
				path: '/xzhy',
				name: 'Xzhy',
				component: () => import(/* webpackChunkName: "about" */ '../views/Xzhy.vue')
			},
			{
				meta: {
					title: '选择号源'
				},
				path: '/xzhy-hs',
				name: 'XzhyHs',
				component: () => import(/* webpackChunkName: "about" */ '../views/XzhyHs.vue')
			},
			{
				meta: {
					title: '挂号确认'
				},
				path: '/ghqr',
				name: 'Ghqr',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ghqr.vue')
			},
			{
				meta: {
					title: '挂号须知'
				},
				path: '/ghxz',
				name: 'Ghxz',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ghxz.vue')
			},
			{
				meta: {
					title: '挂号成功'
				},
				path: '/ghcg',
				name: 'Ghcg',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ghcg.vue')
			},
			{
				meta: {
					title: '科室介绍'
				},
				path: '/ksjs',
				name: 'Ksjs',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ksjs.vue')
			},
			{
				meta: {
					title: '科室医生'
				},
				path: '/ksys',
				name: 'ksysList',
				component: () => import(/* webpackChunkName: "about" */ '../views/ksysList.vue')
			},
			{
				meta: {
					title: '医生介绍'
				},
				path: '/ysjsxq',
				name: 'Ysjsxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ysjsxq.vue')
			},
			{
				meta: {
					title: '专家介绍'
				},
				path: '/zjjs',
				name: 'Zjjs',
				component: () => import(/* webpackChunkName: "about" */ '../views/Zjjs.vue')
			},
			{
				meta: {
					title: '专家介绍详情'
				},
				path: '/zjjsxq',
				name: 'Zjjsxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Zjjsxq.vue')
			},
			{
				meta: {
					title: '就诊须知'
				},
				path: '/jzxz',
				name: 'Jzxz',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jzxz.vue')
			},
			{
				meta: {
					title: '挂号流程'
				},
				path: '/ghlc',
				name: 'Ghlc',
				component: () => import(/* webpackChunkName: "about" */ '../views/Ghlc.vue')
			},
			{
				meta: {
					title: '孕妇学校'
				},
				path: '/yfxx',
				name: 'Yfxx',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yfxx.vue')
			},
			{
				meta: {
					title: '文章详情'
				},
				path: '/wzxq',
				name: 'Wzxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Wzxq.vue')
			},
			{
				meta: {
					title: '医院简介'
				},
				path: '/yyjj',
				name: 'Yyjj',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yyjj.vue')
			},
			{
				meta: {
					title: '院区位置'
				},
				path: '/yqwz',
				name: 'Yqwz',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yqwz.vue')
			},
			{
				meta: {
					title: '院区位置'
				},
				path: '/map',
				name: 'MapContainer',
				component: () => import(/* webpackChunkName: "about" */ '../views/MapContainer.vue')
			},
			{
				meta: {
					title: '医院动态'
				},
				path: '/yydt',
				name: 'Yydt',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yydt.vue')
			},
			{
				meta: {
					title: '个人中心'
				},
				path: '/my',
				name: 'My',
				component: () => import(/* webpackChunkName: "about" */ '../views/My.vue')
			},
			{
				meta: {
					title: '就诊记录'
				},
				path: '/jzjl',
				name: 'Jzjl',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jzjl.vue')
			},
			{
				meta: {
					title: '就诊记录详情'
				},
				path: '/jzjlxq',
				name: 'Jzjlxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jzjlxq.vue')
			},
			{
				meta: {
					title: '预约记录'
				},
				path: '/yyjl',
				name: 'Yyjl',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yyjl.vue')
			},
			{
				meta: {
					title: '预约记录详情'
				},
				path: '/yyjlxq',
				name: 'Yyjlxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Yyjlxq.vue')
			},
			{
				meta: {
					title: '检查结果'
				},
				path: '/jcjg',
				name: 'Jcjg',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jcjg.vue')
			},
			{
				meta: {
					title: '检查结果详情'
				},
				path: '/jcjgxq',
				name: 'Jcjgxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jcjgxq.vue')
			},
			{
				meta: {
					title: '体检报告'
				},
				path: '/tjbg',
				name: 'Tjbg',
				component: () => import(/* webpackChunkName: "about" */ '../views/Tjbg.vue')
			},
			{
				meta: {
					title: '体检报告详情'
				},
				path: '/tjbgxq',
				name: 'Tjbgxq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Tjbgxq.vue')
			},
			{
				meta: {
					title: '就诊人管理'
				},
				path: '/jzrgl',
				name: 'Jzrgl',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jzrgl.vue')
			},
			{
				meta: {
					title: '就诊人列表'
				},
				path: '/jzr-list',
				name: 'JzrList',
				component: () => import(/* webpackChunkName: "about" */ '../views/JzrList.vue')
			},
			{
				meta: {
					title: '就诊码'
				},
				path: '/jzm',
				name: 'Jzm',
				component: () => import(/* webpackChunkName: "about" */ '../views/Jzm.vue')
			},
			{
				meta: {
					title: '添加就诊人'
				},
				path: '/tjjzr',
				name: 'Tjjzr',
				component: () => import(/* webpackChunkName: "about" */ '../views/Tjjzr.vue')
			},
			{
				meta: {
					title: '微信授权'
				},
				path: '/wxsq',
				name: 'Wxsq',
				component: () => import(/* webpackChunkName: "about" */ '../views/Wxsq.vue')
			},
			{
				meta: {
					title: '微信授权'
				},
				path: '/login',
				name: 'GetLogin',
				component: () => import(/* webpackChunkName: "about" */ '../views/GetLogin.vue')
			}
		]
	}
]

const router = new VueRouter({
	// mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	console.log('to', to)
	if(to.meta.title){
		document.title = to.meta.title
	}
	next()
})
export default router
