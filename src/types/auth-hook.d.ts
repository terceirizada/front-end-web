import { LoginFormData } from './login';
import { SignUpFormData } from './sign-up';
import User from '../api/domain/models/user'
import { ComputedRef, Ref} from 'vue';
import { Router } from 'vue-router'

export type AuthHook = {
    isAuthenticated: ComputedRef<boolean>;
    user: Ref<User | null>;
    logIn: (data: LoginFormData) => Promise<boolean>
    signUp: (data: SignUpFormData) => Promise<boolean>
    logOut: (router: Router) => Promise<void>
};