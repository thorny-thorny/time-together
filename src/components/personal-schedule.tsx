import { observer } from 'mobx-react-lite'
import { EditTimeRange } from './edit-time-range'
import { PersonalScheduleModel } from '../model'

type Props = {
  schedule: PersonalScheduleModel
}

export const PersonalSchedule = observer<Props>(({ schedule }) => {
  return (
    <div className='card'>
      <div className='card-header'>{schedule.person.name}</div>
      <div className='card-body'>
        <p>{schedule.person.timezone}</p>
        {schedule.schedule.map((value, index) => (
          <EditTimeRange schedule={schedule.schedule} timeRange={value} key={index} />
        ))}
      </div>
    </div>
  )
})
