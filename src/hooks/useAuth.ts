import { computed, ref } from "vue";
import { SignUpFormData } from "../types/sign-up";
import { SignUpService } from "../api/domain/services/sign-up-service";
import { AuthProps } from "../types/auth";
import { LoginFormData } from "../types/login";
import { LoginService } from "../api/domain/services/login-service";
import { User } from "../types/user";


export const useAuth = (): AuthProps => {
    const user = ref<User>(null!);
    const isAuthenticated = computed(() => !!user.value)

    const signUp = async (data: SignUpFormData) => {
        const signUpService = new SignUpService();
        const registry = await signUpService.execute(data);

        const registeredUser = registry.data;

        return registeredUser ? true : false;
    };

    const logIn = async (data: LoginFormData) => {
        const loginService = new LoginService();
        const login = await loginService.execute(data);

        const { user, token } = login.data;

        if (user && token) {
            user.value = user;
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
