import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { ScheduleContext } from '../context'
import { PersonalTimeline } from './personal-timeline'
import { PersonalTimelineBlock } from './personal-timeline-block'

export const GroupTimeline = observer(() => {
  const { groupSchedule } = useContext(ScheduleContext)

  return (
    <div>
      {/* <div className='bg-secondary'>
        {groupSchedule.personalSchedules.map(schedule => (
          <PersonalTimeline schedule={schedule} key={schedule.person.id} />
        ))}
      </div> */}
      <div className='bg-secondary rounded-1' style={{ overflow: 'hidden' }}>
        {groupSchedule.personalSchedules.map(schedule => (
          <>
            <PersonalTimelineBlock schedule={schedule} key={schedule.person.id} />
            <hr className='m-0' />
          </>
        ))}
      </div>
    </div>
  )
})
