export const validatePasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword || '* As senhas não coincidem.'
}