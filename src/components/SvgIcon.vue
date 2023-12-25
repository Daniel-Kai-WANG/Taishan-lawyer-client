<script setup lang="ts">
defineProps<{
  name: string
  color?: string
}>()
</script>

<template>
  <svg aria-hidden="true" :style="{ fill: color }">
    <use :href="`#${name}`" />
  </svg>
</template>

<style lang="scss" scoped></style>
