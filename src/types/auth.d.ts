
export type AuthProps = {
    isAuthenticated: ComputedRef<boolean>;
    user: User | null;
    logIn: (data: LoginFormData) => Promise<boolean>
    signUp: (data: SignUpFormData) => Promise<boolean>
    logOut: () => void
};