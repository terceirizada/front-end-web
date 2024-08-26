import { computed, ref } from "vue";
import { SignUpFormData } from "../types/sign-up";
import { SignUpService } from "../api/domain/services/sign-up-service";
import { AuthHookProps } from "../types/auth-hook";
import { LoginFormData } from "../types/login";
import { LoginService } from "../api/domain/services/login-service";
import { User } from "../types/user";
import { AuthToken } from "../types/auth-token";
import { APIResponse } from "../types/api";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt-payload";


export const useAuth = (): AuthHookProps => {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => !!user.value)

    const signUp = async (data: SignUpFormData): Promise<boolean> => {
        const signUpService = new SignUpService();
        const registry: APIResponse<User> = await signUpService.execute(data);

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
            user.value = { email }
            localStorage.setItem("token", token);
            
            return true;
        }
        return false;
    };

    const logOut = (): void => {
        user.value = null!;
        localStorage.removeItem("token");
    };

    return {
        user,
        isAuthenticated,
        signUp,
        logIn,
        logOut
    }
}
