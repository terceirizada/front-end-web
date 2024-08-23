import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import ProcessesDashboard from "../components/ProcessesDashboard.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { AuthProps } from "../types/auth";
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
                    name: 'processes-table',
                    component: ProcessesDashboard,
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


router.beforeEach((to, from, next) => {
    const auth: AuthProps = useAuth()
    
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