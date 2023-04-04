import { ScheduleContextProvider } from './context'
import { GroupSchedule } from './components'

export const App = () => {
  return (
    <ScheduleContextProvider>
      <GroupSchedule />
    </ScheduleContextProvider>
  )
}
