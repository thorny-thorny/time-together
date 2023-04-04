import { useLocalObservable } from 'mobx-react-lite'
import { createContext, PropsWithChildren } from 'react'
import { GroupScheduleModel } from '../model'

type ScheduleContextValue = {
  groupSchedule: GroupScheduleModel
}

export const ScheduleContext = createContext<ScheduleContextValue>(null as any)

export const ScheduleContextProvider = (props: PropsWithChildren) => {
  const groupSchedule = useLocalObservable(() => new GroupScheduleModel())
  return <ScheduleContext.Provider value={{ groupSchedule }}>{props.children}</ScheduleContext.Provider>
}
