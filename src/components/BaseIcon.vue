<script setup>
import { ICONS } from '../module/icons'
import { isIconValid } from '../module/validators'

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid
  }
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
