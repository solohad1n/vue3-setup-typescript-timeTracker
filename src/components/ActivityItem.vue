<script setup lang="ts">
import { PERIOD_SELECT_OPTIONS } from '../module/constants'
import { updateActivity, deleteActivity } from '../module/activities'
import { timelineItems, resetTimelineItemActivities } from '../module/timeline-items'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseSelect from './BaseSelect.vue'
import RemainingActivitySeconds from './RemainingActivitySeconds.vue'
import { IconName, type Activity, ButtonType } from '../types/types'

defineProps<{activity: Activity}>()

function deleteAndResetActivity(activity: Activity):void {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="ButtonType.DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="IconName.TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <RemainingActivitySeconds v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
