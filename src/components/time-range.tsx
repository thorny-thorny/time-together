import { MouseEvent as ReactMouseEvent, useMemo } from 'react'
import { IValueDidChange, Lambda, makeAutoObservable, observe } from 'mobx'
import { observer } from 'mobx-react-lite'
import { PersonModel, TimeRangeModel } from '../model'
import { sharedMouseDragTracker } from '../utils/mouse-drag-tracker'

class TimeRangeUi {
  isDragging = false

  private readonly timeRange: TimeRangeModel
  private readonly person: PersonModel
  private originalStart = 0
  private readonly isTail: boolean

  constructor(timeRange: TimeRangeModel, person: PersonModel, isTail?: boolean) {
    this.timeRange = timeRange
    this.person = person
    this.isTail = isTail ?? false
    makeAutoObservable(this)
  }

  onMouseDown = (event: ReactMouseEvent) => {
    this.originalStart = this.timeRange.start
    this.isDragging = true

    sharedMouseDragTracker.startTracking(event)
    const dispose = observe(sharedMouseDragTracker, 'deltaX', change => {
      this.handleDeltaX(dispose, change)
    })
  }

  private handleDeltaX = (dispose: Lambda, { newValue }: IValueDidChange<number | null>) => {
    if (newValue === null) {
      dispose()
      this.isDragging = false
      return
    }

    const duration = this.timeRange.duration
    this.timeRange.start = (this.originalStart + Math.floor(newValue / 48 + 0.5) + 24) % 24
    this.timeRange.end = (this.timeRange.start + duration) % 24
  }

  get start() {
    if (this.isTail) {
      return 0
    }

    return (this.timeRange.start + 24 - this.person.hoursDelta) % 24
  }

  get width() {
    if (this.isTail) {
      return (this.timeRange.end + 24 - this.person.hoursDelta) % 24
    }

    return Math.min(this.timeRange.duration, 24 - ((this.timeRange.start + 24 - this.person.hoursDelta) % 24))
  }

  get end() {
    return this.start + this.width
  }
}

type Props = {
  timeRange: TimeRangeModel
  person: PersonModel
  isTail?: boolean
}

export const TimeRange = observer<Props>(({ timeRange, person, isTail }) => {
  const ui = useMemo(() => new TimeRangeUi(timeRange, person, isTail), [timeRange, person, isTail])

  return (
    <>
      <div style={{ flex: ui.start / 24 }} />
      <div
        className='rounded bg-danger'
        onMouseDown={ui.onMouseDown}
        style={{ flex: ui.width / 24, marginTop: 2, marginBottom: 2, pointerEvents: 'auto', cursor: ui.isDragging ? 'grabbing' : 'grab' }}
      />
      <div style={{ flex: 1 - ui.end / 24 }} />
    </>
  )
})
