import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { ScheduleContext } from '../context'
import { PersonalTimeline } from './personal-timeline'

export const GroupTimeline = observer(() => {
  const { groupSchedule } = useContext(ScheduleContext)

  return (
    <div className='bg-secondary'>
      {groupSchedule.personalSchedules.map(schedule => (
        <PersonalTimeline schedule={schedule} key={schedule.person.id} />
      ))}
    </div>
  )
})
