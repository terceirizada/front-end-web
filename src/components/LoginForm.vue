<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";
import SpinnerLoader from "./SpinnerLoader.vue";
import FormInput from "./FormInput.vue";
import FormLabel from "./FormLabel.vue";
import { z } from "zod";
import { RouterLink, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginFormData } from "../types/login";
import InputErrorMessage from "./InputErrorMessage.vue";
import { useAuth } from "../hooks/useAuth";
import { onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt-payload";

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
const { value: password, errorMessage: passwordError } =
  useField<string>("password");

const auth = useAuth();
const router = useRouter();

onMounted(()=>{
  const token = localStorage.getItem('token');
    if (token) {
        auth.isAuthenticated.value = true;
        const { email } = jwtDecode<JwtPayload>(token)
        auth.user.value?.setEmail(email)
        router.push('/flow')
    }else{
      router.push('/')
    }
})

const handleLogin = async (data: LoginFormData) => {
  try {
    const isLogged = await auth.logIn(data);
    if (isLogged) {
      alert("Login realizado com sucesso!");
      router.push("/flow");
    }
  } catch (error) {
    if(error instanceof Error)
    if(error.response.status === 404){
      alert('Usuário não encontrado.')
    }else{
      alert('Erro ao realizar login.')
    }
  }
};

const onSubmit = handleSubmit(handleLogin);
</script>

<template>
  <form data-testid="login-form" className="space-y-6" @submit="onSubmit">
    <div>
      <FormLabel htmlFor="email" text="Email" data-testid="email-label"/>
      <div className="mt-2">
        <FormInput
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
        <FormLabel htmlFor="password" text="Senha" />
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
        <FormInput
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
      <PrimaryButton type="submit" :title="isSubmitting ? '' : 'Entrar'" :disabled="isSubmitting">
        <SpinnerLoader v-if="isSubmitting" />
      </PrimaryButton>
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
