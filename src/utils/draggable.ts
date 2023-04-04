import { MouseEvent as ReactMouseEvent } from 'react'
import { IValueDidChange, Lambda, makeAutoObservable, observe } from 'mobx'
import { sharedMouseDragTracker } from './mouse-drag-tracker'

export class Draggable {
  private lastX = 0
  private tempX: number | null = 0

  constructor() {
    makeAutoObservable(this)
  }

  onMouseDown = (event: ReactMouseEvent) => {
    sharedMouseDragTracker.startTracking(event)
    const dispose = observe(
      sharedMouseDragTracker,
      'deltaX',
      change => {
        this.handleDeltaX(dispose, change)
      },
      true,
    )
  }

  private handleDeltaX = (dispose: Lambda, { newValue }: IValueDidChange<number | null>) => {
    if (newValue === null) {
      this.lastX = this.tempX ?? 0
      dispose()
      return
    }

    this.tempX = this.lastX + newValue
  }

  get x() {
    return this.tempX ?? this.lastX
  }
}
