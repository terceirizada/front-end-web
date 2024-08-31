import { LoginFormData } from './login';
import { SignUpFormData } from './sign-up';
import User from '../api/domain/models/user'
import { Ref } from 'vue';
import { Router } from 'vue-router'

export type AuthHook = {
    isAuthenticated: Ref<boolean>
    user: Ref<User | null>;
    logIn: (data: LoginFormData) => Promise<boolean>
    signUp: (data: SignUpFormData) => Promise<boolean>
    logOut: (router: Router) => Promise<void>
};