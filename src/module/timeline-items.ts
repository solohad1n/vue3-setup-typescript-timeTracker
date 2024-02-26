import { computed, ref, watch, ComponentPublicInstance } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { endOfHour, isToday, now, toSeconds, today } from './time'
import { stopTimelineItemTimer } from './timeline-item-timer'
import type { Activity, State, TimeLineItem } from '../types/types'

export const timelineItemRefs = ref<ComponentPublicInstance[] | null>(null)


export const timelineItems = ref<TimeLineItem[]>([])

export const activeTimelineItem = computed(():TimeLineItem | undefined =>
  timelineItems.value.find(({ isActive }):boolean => isActive)
)

watch<Date>(now, (after, before):void => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }

  if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
    resetTimelineItems()
  }
})

export function initializeTimelineItems(state: State):void {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}

export function updateTimelineItem(timelineItem:TimeLineItem, fields: Partial<TimeLineItem>):TimeLineItem {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems:TimeLineItem[], activity: Activity):void {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem:TimeLineItem):void => {
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
    })
  })
}

export function calculateTrackedActivitySeconds(timelineItems:TimeLineItem[], activity:Activity):number {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }:TimeLineItem):number => activitySeconds)
    .reduce((total:number, seconds:number) => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth = false):void {
  scrollToHour(today().getHours(), isSmooth)
}

export function scrollToHour(hour:number, isSmooth = true):void {
  const el:HTMLBodyElement | HTMLLIElement = hour === MIDNIGHT_HOUR || !timelineItemRefs.value ? document.body : timelineItemRefs.value[hour - 1].$el

  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function resetTimelineItems():void {
  timelineItems.value.forEach((timelineItem):void => {
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false
    })
  })
}

function syncIdleSeconds(lastActiveAt:Date):void {
  updateTimelineItem(activeTimelineItem.value as any, {
    activitySeconds: (activeTimelineItem.value as any).activitySeconds + calculateIdleSeconds(lastActiveAt)
  })
}

function calculateIdleSeconds(lastActiveAt:Date):number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() as any - (lastActiveAt as any))
    : toSeconds((endOfHour(lastActiveAt) as any) - (lastActiveAt as any))
}

function filterTimelineItemsByActivity(timelineItems:TimeLineItem[], { id }:Activity):TimeLineItem[] {
  return timelineItems.filter(({ activityId }):boolean => activityId === id)
}

function generateTimelineItems():TimeLineItem[] {
  return [...Array(HOURS_IN_DAY).keys()].map((hour):TimeLineItem => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false
  }))
}
