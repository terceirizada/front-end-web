<script setup lang="ts">
import { InputHTMLAttributes } from 'vue';

interface InputProps extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue: string | number | undefined
  error: string | number | undefined
}

defineProps<InputProps>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

</script>
<template>
  <input
    :value="modelValue"
    @input="onInput"
    :class="[error && ['border border-red-500'], ['block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6']]"
  />
</template>
