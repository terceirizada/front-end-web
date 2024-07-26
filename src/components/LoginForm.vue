<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "./Button.vue";
import Loader from "./Loader.vue";
import Input from "./Input.vue";
import Label from "./Label.vue";
import InputErrorMessage from "./InputErrorMessage.vue";

</script>

<template>
  <form data-testid="login-form" className="space-y-6" >
    <div>
      <Label htmlFor="email" text="Email" />
      <div className="mt-2">
        <Input id="email" type="email" autoComplete="email" required/>
        <InputErrorMessage :error="false" message="* Este campo é obrigatório" />
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
        <Input id="password" type="password" autoComplete="current-password" />
        <InputErrorMessage
          :error="false"
          message="* Este campo é obrigatório"
        />
      </div>
    </div>

    <div>
      <Button type="submit" >
        <Loader v-if="false" />
        Entrar
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
