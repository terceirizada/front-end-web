<script setup lang="ts">
import { LabelHTMLAttributes } from "vue";

interface LabelProps extends /*@vue-ignore*/ LabelHTMLAttributes {
  text: string;
}

defineProps<LabelProps>();
</script>
<template>
  <label className="block text-md font-medium leading-6 text-gray-900">
    {{ text }}
  </label>
</template>
