import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, useMemo } from 'react'
import { TimeRangeModel } from '../model'

type Props = {
  schedule: TimeRangeModel[]
  timeRange: TimeRangeModel
}

export const EditTimeRange = observer<Props>(({ schedule, timeRange }) => {
  const { onStartChange, onEndChange, onDeleteClick } = useMemo(
    () =>
      makeAutoObservable({
        onStartChange: (event: ChangeEvent<HTMLInputElement>) => {
          timeRange.start = (Number(event.target.value) + 24) % 24
        },
        onEndChange: (event: ChangeEvent<HTMLInputElement>) => {
          timeRange.end = (Number(event.target.value) + 24) % 24
        },
        onDeleteClick: () => {
          const index = schedule.indexOf(timeRange)
          schedule.splice(index, 1)
        },
      }),
    [timeRange],
  )

  return (
    <div className='mb-3'>
      <input
        type='number'
        value={timeRange.start}
        onChange={onStartChange}
        className='form-control d-inline-block'
        style={{ width: '100px' }}
      />
      <input
        type='number'
        value={timeRange.end}
        onChange={onEndChange}
        className='form-control d-inline-block'
        style={{ width: '100px' }}
      />
      <button type='button' onClick={onDeleteClick} className='btn btn-danger d-inline-block'>
        X
      </button>
    </div>
  )
})
