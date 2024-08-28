import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import MainView from "../views/MainView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { AuthHook } from "../types/auth-hook";
import { useAuth } from "../hooks/useAuth";


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
                    meta: {
                        requiresAuth: true
                    }
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


router.beforeEach((to, _from, next) => {
    const auth: AuthHook = useAuth()
    
    if (to.meta.requiresAuth && !!auth.isAuthenticated.value) {
        next({
            path: '/',
            query: { redirect: to.fullPath },
        })
    } else {
        next()
    }
})


export default router