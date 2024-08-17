<script setup lang="ts">
import Button from "./Button.vue";
import Loader from "./Loader.vue";
import Input from "./Input.vue";
import Label from "./Label.vue";
import { z } from "zod";
import { RouterLink, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginFormData } from "../types/login";
import InputErrorMessage from "./InputErrorMessage.vue";
import { useAuth } from "../hooks/useAuth";

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "Este campo é obrigatório")
      .email("Este campo precisa ser um email")
      .default(""),
    password: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(8, "Sua senha tem no mínimo 8 caracteres")
      .default(""),
  })
);

const { handleSubmit, isSubmitting } = useForm<LoginFormData>({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError} = useField<string>("password");


const auth = useAuth()
const router = useRouter()


const handleLogin = async (data: LoginFormData) => {
  try {
      const isLogged = await auth.logIn(data)
      if(isLogged){
        router.push('/flow')
        alert('Login realizado com sucesso!')
      }
  } catch (error: any) {
    alert(error.message)
  }
}

const onSubmit = handleSubmit(handleLogin);


</script>

<template>
  <form data-testid="login-form" className="space-y-6" @submit="onSubmit">
    <div>
      <Label htmlFor="email" text="Email" />
      <div className="mt-2">
        <Input
          id="email"
          v-model="email"
          type="email"
          name="email"
          autoComplete="email"
          :error="emailError"
        />
        <InputErrorMessage :error="emailError" />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="password" text="Senha" />
        <div className="text-sm">
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <Input
          id="password"
          v-model="password"
          type="password"
          name="password"
          autoComplete="current-password"
          :error="passwordError"
        />
        <InputErrorMessage :error="passwordError" />
      </div>
    </div>

    <div>
      <Button type="submit" :disabled="isSubmitting">
        <Loader v-if="isSubmitting" />
        <p v-if="!isSubmitting">Entrar</p>
      </Button>
    </div>

    <p className="mt-10 text-center text-sm text-gray-500">
      Não possui cadastro?
      <RouterLink
        to="/register"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Cadastre-se agora.
      </RouterLink>
    </p>
  </form>
</template>
