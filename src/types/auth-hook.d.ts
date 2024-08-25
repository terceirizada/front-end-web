import { User } from './user'
import { LoginFormData } from './login';
import { SignUpFormData } from './sign-up';
import { ComputedRef } from 'vue';

export type AuthHookProps = {
    isAuthenticated: ComputedRef<boolean>;
    user: Ref<User | null>;
    logIn: (data: LoginFormData) => Promise<boolean>
    signUp: (data: SignUpFormData) => Promise<boolean>
    logOut: () => void
};