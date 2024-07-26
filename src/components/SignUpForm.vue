<script setup lang="ts">
import InputErrorMessage from './InputErrorMessage.vue'
import Label from './Label.vue';
import Input from './Input.vue';
import Button from './Button.vue';

</script>

<template>
        <form data-testid='login-form' className="space-y-6" >
            <div>
                <Label htmlFor="email" text="Email" />
                <div className="mt-2">
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                    />
                    <InputErrorMessage
                        error=""
                        message="* Este campo é obrigatório"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password" text="Senha" />
                <div className="mt-2">
                    <Input
                        data-testid='password'
                        id="password"
                        type="password"
                    />
                    <InputErrorMessage
                        error=""
                        message="* Este campo é obrigatório"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="confirmPassword" text="Confirme a senha" />
                <div className="mt-2">
                    <Input
                        data-testid="confirmPassword"
                        id="confirmPassword"
                        type="password"
                    />
                    <InputErrorMessage
                        error=""
                        message=""
                    />
                    <InputErrorMessage
                        error=""
                        message="* Este campo é obrigatório"
                    />
                </div>
            </div>

            <div>
                <Button type="submit" >
                    <Loader />
                    Entrar
                </Button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Já possui cadastro?
                <RouterLink to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Entre agora.
                </RouterLink>
            </p>

        </form>
</template>
