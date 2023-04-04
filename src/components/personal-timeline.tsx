import { observer } from 'mobx-react-lite'
import React from 'react'
import { PersonalScheduleModel } from '../model'
import { TimeRange } from './time-range'
import { TimelineSection } from './timeline-section'

type Props = {
  schedule: PersonalScheduleModel
}

export const PersonalTimeline = observer<Props>(({ schedule }) => {
  const sections: React.ReactElement[] = []
  for (let i = 0; i < 24; i++) {
    sections.push(<TimelineSection hour={(i + schedule.person.hoursDelta + 24) % 24} key={i} />)
  }

  sections.push(<TimelineSection hour={null} key={24} />)

  const splitSchedule = schedule.schedule.find(
    timeRange => (timeRange.end + 24 - schedule.person.hoursDelta) % 24 < (timeRange.start + 24 - schedule.person.hoursDelta) % 24,
  )

  return (
    <div className='position-relative' style={{ height: 54 }}>
      {sections}
      {schedule.schedule.map((timeRange, index) => (
        <TimeRange timeRange={timeRange} person={schedule.person} key={index} />
      ))}
      {splitSchedule && <TimeRange timeRange={splitSchedule} person={schedule.person} isTail={true} key='tail' />}
    </div>
  )
})
