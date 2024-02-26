import {
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_NEUTRAL,
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS
} from '../module/constants'

export enum  ProgressColorClass {
  RED = 'bg-red-500',
  YELLOW = 'bg-yellow-500',
  BLUE = 'bg-blue-500',
  GREEN = 'bg-green-500',
}

export type ButtonType = 
typeof BUTTON_TYPE_PRIMARY |
typeof BUTTON_TYPE_SUCCESS |
typeof BUTTON_TYPE_WARNING |
typeof BUTTON_TYPE_NEUTRAL |
typeof BUTTON_TYPE_DANGER

export type PageName = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS

export type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23

export interface Activity {
  id: string;
  name: string;
  secondsToComplete: number;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export interface State {
  timelineItems: TimeLineItem[];
  activities: Activity[];
  lastActiveAt: Date
}

export interface TimeLineItem {
  hour: Hour
  activityId: Activity['id'] | null
  activitySeconds: number
  isActive: boolean
}

export interface NavItems {
  page: PageName;
  icon: string;
}


