<script setup lang="ts" generic="T extends number | string">
import { normalizeSelectValue } from '../module/functions'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { ButtonType, IconName, type SelectOption } from '../types/types'

defineProps<{
  options: SelectOption<T>[];
  selected: number | string | null;
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'select', value: T | null): void 
  // select: [value: number | string | null] - новый способ
}>()


function select(value: string | null):void {
  emit('select', normalizeSelectValue(value))
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="ButtonType.NEUTRAL" @click="select(null)">
      <BaseIcon :name="IconName.X_MARK" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="isNotSelected === null" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
