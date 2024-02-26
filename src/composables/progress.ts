import { type ComputedRef, computed } from 'vue'
import { getProgressColorClass } from '../module/functions'
import { calculateActivityCompletionPercentage } from '../module/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '../module/timeline-items'
import type { Activity, ProgressColorClass } from '../types/types'

export function useProgress(activity: Activity): {
  colorClass: ComputedRef<ProgressColorClass>;
  percentage: ComputedRef<number>;
  trackedActivitySeconds: ComputedRef<number>;
} {
  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const percentage = computed(():number =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
  )

  const trackedActivitySeconds = computed(():number =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  return {
    colorClass,
    percentage,
    trackedActivitySeconds
  }
}
