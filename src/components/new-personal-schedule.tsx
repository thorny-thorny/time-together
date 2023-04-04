import { makeAutoObservable } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { ChangeEvent, FormEvent, useContext } from 'react'
import moment from 'moment-timezone'
import { ScheduleContext } from '../context'
import { GroupScheduleModel, PersonalScheduleModel, PersonModel, TimeRangeModel } from '../model'

class NewPersonalScheduleModel {
  name = ''
  timezone = moment.tz.guess()

  constructor(private readonly groupSchedule: GroupScheduleModel) {
    makeAutoObservable(this)
  }

  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.name = event.target.value
  }

  onTimezoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.timezone = event.target.value
  }

  onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const schedule = new PersonalScheduleModel(new PersonModel(nanoid(), this.name, this.timezone))
    schedule.schedule.push(new TimeRangeModel(1, 3))
    schedule.schedule.push(new TimeRangeModel(12, 16))
    this.groupSchedule.personalSchedules.push(schedule)
    this.name = ''
  }
}

export const NewPersonalSchedule = observer(() => {
  const { groupSchedule } = useContext(ScheduleContext)
  const model = useLocalObservable(() => new NewPersonalScheduleModel(groupSchedule))

  const timezones = moment.tz.names()

  return (
    <div className='card'>
      <div className='card-header'>Add person</div>
      <div className='card-body'>
        <form onSubmit={model.onSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input id='name' type='text' className='form-control' value={model.name} onChange={model.onNameChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor='timezone' className='form-label'>
              Time zone
            </label>
            <select id='timezone' className='form-select' value={model.timezone} onChange={model.onTimezoneChange}>
              {timezones.map((tz, index) => (
                <option value={tz} key={index}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>
            Add
          </button>
        </form>
      </div>
    </div>
  )
})
