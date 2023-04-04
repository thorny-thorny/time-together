import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { GroupTimeline } from './group-timeline'
import { ScheduleContext } from '../context'
import { NewPersonalSchedule } from './new-personal-schedule'
import { PersonalSchedule } from './personal-schedule'

export const GroupSchedule = observer(() => {
  const { groupSchedule } = useContext(ScheduleContext)

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <NewPersonalSchedule />
        </div>
        {groupSchedule.personalSchedules.map(schedule => (
          <div className='col-3' key={schedule.person.id}>
            <PersonalSchedule schedule={schedule} />
          </div>
        ))}
      </div>
      <h1>Time together: {groupSchedule.timeTogether} hours</h1>
      <div className='row'>
        <GroupTimeline />
      </div>
    </div>
  )
})
