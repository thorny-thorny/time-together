import { makeAutoObservable } from 'mobx'
import moment from 'moment-timezone'

export class TimeModel {
  hours: number
  minutes: number

  constructor(hours: number, minutes: number) {
    this.hours = hours
    this.minutes = minutes

    makeAutoObservable(this)
  }
}

export class TimeRangeModel {
  start: number
  end: number

  constructor(start: number, end: number) {
    this.start = start
    this.end = end

    makeAutoObservable(this)
  }

  get duration() {
    return (this.end + 24 - this.start) % 24
  }
}

export class PersonModel {
  id: string
  name: string
  timezone: string

  constructor(id: string, name: string, timezone: string) {
    this.id = id
    this.name = name
    this.timezone = timezone
  }

  get hoursDelta() {
    return moment.tz(this.timezone).utcOffset() / 60
  }
}

export class PersonalScheduleModel {
  readonly person: PersonModel
  readonly schedule: TimeRangeModel[] = []

  constructor(person: PersonModel) {
    this.person = person

    makeAutoObservable(this)
  }
}

export class GroupScheduleModel {
  readonly personalSchedules: PersonalScheduleModel[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get timeTogether() {
    let hours = 0
    for (let hour = 0; hour < 24; hour++) {
      const hourIsBusy = this.personalSchedules.some(schedule =>
        schedule.schedule.some(timeRange => {
          const utcStart = (timeRange.start + 24 - schedule.person.hoursDelta) % 24
          const utcEnd = (timeRange.end + 24 - schedule.person.hoursDelta) % 24

          const afterStart = hour >= utcStart
          const beforeEnd = hour < utcEnd

          if (utcEnd < utcStart) {
            return afterStart || beforeEnd
          }

          return afterStart && beforeEnd
        }),
      )

      if (!hourIsBusy) {
        hours += 1
      }
    }

    return hours
  }
}
