<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => router.go(-1)

</script>
<template>
    <section class="text-center flex flex-col items-center">
        <AlertTriangle :size="90" color="red"/>
        <h1 class="text-6xl font-bold">
            404 Not Found
        </h1>
        <p class="text-xl mb-5">A página ou recurso não existe.</p>
        <RouterLink to="#" @click.prevent="goBack">
            <Button>
                Voltar
            </Button>
        </RouterLink>
    </section>
</template>