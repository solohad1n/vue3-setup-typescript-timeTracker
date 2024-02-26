<script setup lang="ts">
import { PAGE_TIMELINE } from '../module/constants'
import { currentPage, navigate } from '../router'
import { scrollToCurrentHour } from '../module/timeline-items'

function handleClick():void {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img src="../assets/img/logo.png" alt="Logo" class="h-9" />
  </a>
</template>
