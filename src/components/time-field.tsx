import { observer } from 'mobx-react-lite'
import { TimeModel } from '../model'

type Props = {
  time: number
}

export const TimeField = observer<Props>(({ time }) => {
  return (
    <div className='input-group input-group-sm' style={{ float: 'left', width: 120 }}>
      <input
        type='text'
        className='form-control'
        value={time}
        placeholder='HH'
        style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
      />
      <span className='input-group-text' style={{ paddingLeft: 1, paddingRight: 1 }}>
        :
      </span>
      <input type='text' className='form-control' placeholder='MM' style={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }} />
      <select className='form-select' style={{ paddingLeft: 0, paddingRight: 25, textAlign: 'center' }}>
        <option selected>AM</option>
        <option>PM</option>
      </select>
    </div>
  )
})
