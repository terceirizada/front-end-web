<script setup lang="ts">
import FormLabel from "./FormLabel.vue";
import FormInput from "./FormInput.vue";
import PrimaryButton from "./PrimaryButton.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { SignUpFormData } from "../types/sign-up";
import { isPasswordsMatching } from "../utils/is-password-matching";
import InputErrorMessage from "./InputErrorMessage.vue";
import SpinnerLoader from "./SpinnerLoader.vue";
import { useRouter } from 'vue-router'
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
    confirmPassword: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(8, "Sua senha deve ter no mínimo 8 caracteres")
      .default(""),
  }).refine(data => isPasswordsMatching(data.password, data.confirmPassword), {
    path: ['confirmPassword'],
    message: "As senhas não coincidem",
  })
);

const { handleSubmit, isSubmitting } = useForm<SignUpFormData>({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>("confirmPassword");

const auth = useAuth()
const router = useRouter()

const handleSignUp = async (data: SignUpFormData) => {
  try {
      const isRegistered = await auth.signUp(data)
      if(isRegistered){
        router.push('/')
        alert('Cadastro realizado com sucesso!')
      }
  } catch (error) {
    if (error instanceof Error)
    if(error instanceof Error)
    if(error.response.status === 409){
      alert('Usuário já existe.')
    }else{
      alert('Erro ao realizar cadastro.')
    }
  }
}

const onSubmit = handleSubmit(handleSignUp);


</script>

<template>
  <form data-testid="login-form" className="space-y-6" @submit="onSubmit">
    <div>
      <FormLabel htmlFor="email" text="Email" />
      <div className="mt-2">
        <FormInput
          v-model="email"
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          :error="emailError"
        />
        <InputErrorMessage :error="emailError"/>
      </div>
    </div>

    <div>
      <FormLabel htmlFor="password" text="Senha" />
      <div className="mt-2">
        <FormInput
          v-model="password"
          data-testid="password"
          id="password"
          type="password"
          name="password"
          :error="passwordError"
        />
        <InputErrorMessage :error="passwordError"/>
      </div>
    </div>

    <div>
      <FormLabel htmlFor="confirmPassword" text="Confirme a senha" />
      <div className="mt-2">
        <FormInput
          v-model="confirmPassword"
          data-testid="confirmPassword"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          :error="confirmPasswordError"
        />
        <InputErrorMessage :error="confirmPasswordError"/>
      </div>
    </div>

    <div>
      <PrimaryButton type="submit" :title="isSubmitting ? '' : 'Cadastrar'" :disabled="isSubmitting">
        <SpinnerLoader v-if="isSubmitting" />
      </PrimaryButton>
    </div>

    <p className="mt-10 text-center text-sm text-gray-500">
      Já possui cadastro?
      <RouterLink
        to="/"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Entre agora.
      </RouterLink>
    </p>
  </form>
</template>
