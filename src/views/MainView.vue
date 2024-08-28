<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';
import { onMounted } from 'vue';
import ProcessesDashboard from '../components/ProcessesDashboard.vue';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'vue-router'
import { JwtPayload } from '../types/jwt-payload';

const auth = useAuth()
const router = useRouter()

onMounted(()=>{
  const token = localStorage.getItem('token');
    if (token) {
        auth.isAuthenticated.value = true;
        const { email } = jwtDecode<JwtPayload>(token)
        auth.user.value?.setEmail(email)
    }else{
      router.push('/')
    }
})
</script>
<template>
    <ProcessesDashboard data-testid="main" v-if="auth.isAuthenticated.value"/>
</template>