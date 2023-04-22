import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { PersonalScheduleModel, PersonModel, TimeRangeModel } from '../model'
import { PersonalTimeRange } from './personal-time-range'

const Lines = () => {
  return (
    <div className='d-flex flex-grow-1'>
      {[...Array(24)].map((_, index) => (
        <div className='flex-grow-1 border-start' />
      ))}
    </div>
  )
}

type HoursProps = {
  person: PersonModel
}

const Hours = observer<HoursProps>(({ person }) => {
  return (
    <div className='d-flex flex-grow-1 align-self-start'>
      {[...Array(24)].map((_, i) => (
        <div className='' style={{ flex: 1, fontSize: 12 }}>
          {`${(i + person.hoursDelta + 24) % 24}h`}
        </div>
      ))}
    </div>
  )
})

const Btn = ({ children, onClick }: { children: any; onClick: () => void }) => {
  return (
    <a
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
      className='btn btn-light rounded-0 w-100'
      href='#'
      role='button'
    >
      {children}
    </a>
  )
}

type Props = {
  schedule: PersonalScheduleModel
}

export const PersonalTimelineBlock = observer(({ schedule }: Props) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className='position-relative'>
      <div className='position-absolute h-100 d-flex flex-row' style={{ left: 300, right: 0 }}>
        <Lines />
      </div>
      <div className={`${expanded ? 'position-absolute' : 'position-relative'}`} style={{ width: 300 }}>
        <Btn onClick={() => setExpanded(!expanded)}>{schedule.person.name}</Btn>
      </div>
      <div
        className={`${expanded ? 'position-relative' : 'position-absolute w-100 h-100 top-0 start-0 d-flex flex-column'}`}
        style={{ pointerEvents: 'none' }}
      >
        <div className='d-flex flex-row'>
          <div style={{ width: 300, visibility: 'hidden' }}>{expanded && <Btn onClick={() => setExpanded(!expanded)}>_</Btn>}</div>
          <Hours person={schedule.person} />
        </div>
        <div className={`position-relative`} style={{ flex: expanded ? undefined : 1 }}>
          {expanded && (
            <div style={{ width: 300 }}>
              <p>{schedule.person.timezone}</p>
            </div>
          )}
          {schedule.schedule.map((timeRange, i) => (
            <PersonalTimeRange person={schedule.person} schedule={schedule.schedule} timeRange={timeRange} expanded={expanded} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
})
