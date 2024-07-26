<script setup lang="ts">
import { defineProps } from 'vue'

type InputErrorMessageProps = {
  error: boolean,
  message: string
}

defineProps<InputErrorMessageProps>()

</script>

<template>
  <p v-if="error" class="text-red-500">{{ message }}</p>
</template>
