import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import MainView from "../views/MainView.vue";
import NotFoundView from "../views/NotFoundView.vue";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'app',
            component: App,
            children: [
                {
                    path: '/',
                    name: 'init',
                    component: LoginView,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: LoginView,
                },
                {
                    path: '/register',
                    name: 'register',
                    component: SignUpView
                },
                {
                    path: '/flow',
                    name: 'main-view',
                    component: MainView,
                },
                {
                    path: '/:catchAll(.*)',
                    name: 'not-found',
                    component: NotFoundView
                }
            ]
        },

    ]
})

export default router