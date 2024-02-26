<script setup lang="ts">
import { PAGE_TIMELINE } from '../module/constants'
import { currentPage, navigate } from '../router'
import { scrollToCurrentHour } from '../module/timeline-items'
import { IconName } from '../types/types';

function handleClick():void {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick" class="origin-left scale-125 rounded bg-black p-1 text-white">
    <BaseIcon :name="IconName.CLOCK" class="h-5"/>
  </a>
</template>
