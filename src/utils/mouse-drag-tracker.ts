import { MouseEvent as ReactMouseEvent } from 'react'
import { makeAutoObservable } from 'mobx'

class MouseDragTracker {
  private startEvent: MouseEvent | null = null
  private recentEvent: MouseEvent | null = null

  constructor() {
    makeAutoObservable(this)
  }

  startTracking = (mouseDownEvent: ReactMouseEvent) => {
    this.startEvent = mouseDownEvent.nativeEvent
    this.startEvent.preventDefault()
    this.recentEvent = this.startEvent

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  private onMouseMove = (event: MouseEvent) => {
    this.recentEvent = event
  }

  private onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)

    this.startEvent = null
    this.recentEvent = null
  }

  get deltaX() {
    const startX = this.startEvent?.pageX
    const recentX = this.recentEvent?.pageX
    if (startX === undefined || recentX === undefined) {
      return null
    }

    return recentX - startX
  }
}

export const sharedMouseDragTracker = new MouseDragTracker()
