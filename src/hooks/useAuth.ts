import { computed, ref } from "vue";
import { SignUpFormData } from "../types/sign-up";
import { SignUpService } from "../api/domain/services/sign-up-service";
import { AuthHookProps } from "../types/auth-hook";
import { LoginFormData } from "../types/login";
import { LoginService } from "../api/domain/services/login-service";
import { User } from "../types/user";
import { AuthToken } from "../types/auth-token";


export const useAuth = (): AuthHookProps => {
    const user = ref<User | null>(null!);
    const isAuthenticated = computed(() => !!user.value)

    const signUp = async (data: SignUpFormData) => {
        const signUpService = new SignUpService();
        const registry = await signUpService.execute<User>(data);

        const registeredUser = registry.data;

        return registeredUser ? true : false;
    };

    const logIn = async (data: LoginFormData) => {
        const loginService = new LoginService();
        const login = await loginService.execute<AuthToken>(data);

        const { user: loggedUser, token } = login.data

        if (loggedUser && token) {
            user.value = loggedUser;
            localStorage.setItem("token", token);
            
            return true;
        }
        return false;
    };

    const logOut = () => {
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
