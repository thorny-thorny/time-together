import { observer } from 'mobx-react-lite'
import { PersonModel, TimeRangeModel } from '../model'
import { EditTimeRange } from './edit-time-range'
import { TimeRange } from './time-range'

type Props = {
  person: PersonModel
  schedule: TimeRangeModel[]
  timeRange: TimeRangeModel
  expanded: boolean
}

export const PersonalTimeRange = observer(({ person, schedule, timeRange, expanded }: Props) => {
  const needsSplit = (timeRange.end + 24 - person.hoursDelta) % 24 < (timeRange.start + 24 - person.hoursDelta) % 24

  return (
    <div className={`d-flex flex-row ${expanded ? '' : 'position-absolute w-100 h-100 top-0 start-0'}`}>
      <div style={{ width: 300, height: expanded ? undefined : 0, overflow: 'hidden', pointerEvents: 'auto' }}>
        <EditTimeRange schedule={schedule} timeRange={timeRange} />
      </div>
      <div className='position-relative' style={{ flex: 1 }}>
        <div className='position-absolute w-100 h-100 top-0 start-0 d-flex flex-row'>
          <TimeRange person={person} timeRange={timeRange} />
        </div>
        {needsSplit && (
          <div className='position-absolute w-100 h-100 top-0 start-0 d-flex flex-row'>
            <TimeRange person={person} timeRange={timeRange} isTail={true} />
          </div>
        )}
      </div>
    </div>
  )
})
