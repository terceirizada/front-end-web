import { Ref, ref } from "vue";
import { SignUpFormData } from "../types/sign-up";
import { SignUpService } from "../api/domain/services/sign-up-service";
import { AuthHook } from "../types/auth-hook";
import { LoginFormData } from "../types/login";
import { LoginService } from "../api/domain/services/login-service";
import { AuthToken } from "../types/auth-token";
import { APIResponse } from "../types/api";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt-payload";
import User from "../api/domain/models/user";
import { Router } from "vue-router";


export const useAuth = (): AuthHook => {
    const user = ref<User | null>(null) as Ref<User | null>;
    const isAuthenticated = ref<boolean>(false)

    const signUp = async (data: SignUpFormData): Promise<boolean> => {
        const signUpService = new SignUpService();
        const registry: APIResponse<User> = await signUpService.execute(data);

        if (registry) {
            user.value = registry.data
        }

        const registeredUser = registry.data;

        return registeredUser ? true : false;
    };

    const logIn = async (data: LoginFormData): Promise<boolean> => {
        const loginService = new LoginService();
        const login: APIResponse<AuthToken> = await loginService.execute(data);

        const { token } = login.data
        const tokenPayload = jwtDecode<JwtPayload>(token)

        const { email } = tokenPayload

        if (token && email) {
            const loggedUser = new User()
            loggedUser.setEmail(email)
            user.value = loggedUser
            isAuthenticated.value = true
            localStorage.setItem("token", token);

            return true;
        }
        return false;
    };

    const logOut = async (router: Router) => {
        user.value = null!;
        isAuthenticated.value = false;
        localStorage.removeItem("token");
        await router.push('/login')
    };

    return {
        user,
        isAuthenticated,
        signUp,
        logIn,
        logOut
    }
}
