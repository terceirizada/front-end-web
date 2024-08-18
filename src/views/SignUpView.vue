<script setup lang="ts">
import AppLogo from '../components/AppLogo.vue';
import SignUpForm from '../components/SignUpForm.vue';
</script>

<template>
  <div
    data-testid="signup"
    className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <AppLogo />
      <h1
        className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Cadastro
      </h1>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <SignUpForm />
    </div>
  </div>
</template>
