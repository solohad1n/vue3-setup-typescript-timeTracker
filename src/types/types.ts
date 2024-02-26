import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../module/constants'
export type PageName = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS

export interface Activity {
  id: string;
  name: string;
  secondsToComplete: number;
}

export interface ActivitySelectOption {
  value: string;
  label: string;
}

export interface State {
  timelineItems: any;
  activities: Activity[];
  lastActiveAt: Date
}

// export interface TimeLineItem {
//   hour: Hour
//   activityId: Activity['id'] | null
//   activitySeconds: number
//   isActive: boolean
// }

export interface TimeLineItem {
  hour: number
  activityId: string | null
  activitySeconds: number
  isActive: boolean
}