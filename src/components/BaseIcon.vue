<script setup lang="ts">
import { ICONS } from '../module/icons'
import type { IconName } from '../types/types';

defineProps<{ name: IconName }>()

</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
