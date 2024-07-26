<script setup lang="ts">
import { RouterLink } from "vue-router"
import logo from "@/assets/images/logo.svg"

</script>

<template>
    <RouterLink to="/">
        <img :src="logo" alt="Logotipo do AgileFlow" className="mx-auto h-24 w-auto">
    </RouterLink>
</template>