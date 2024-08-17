import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ProcessesTable from "../components/ProcessesTable.vue";
import NotFound from "../views/NotFound.vue";
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
                    component: Login,
                },
                {
                    path: '/register',
                    name: 'register',
                    component: SignUp
                },
                {
                    path: '/flow',
                    name: 'processes-table',
                    component: ProcessesTable,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/:catchAll(.*)',
                    name: 'not-found',
                    component: NotFound
                }
            ]
        },

    ]
})


router.beforeEach((to, from, next) => {
    const auth: AuthProps = useAuth()
    
    if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
        next({
            path: '/',
            query: { redirect: to.fullPath },
        })
    } else {
        next()
    }
})


export default router