<script setup lang="ts">
type InpurErrorProps = {
  error: string | number | undefined;
};
defineProps<InpurErrorProps>();
</script>

<template>
    <span v-if="error" class="text-sm text-red-500 font-bold">{{ error }}</span>
</template>
