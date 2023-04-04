type Props = {
  hour: number | null
}

export const TimelineSection = ({ hour }: Props) => {
  return (
    <div className='d-inline-block h-100 border-start' style={{ width: 48 }}>
      {hour ?? '-'}
    </div>
  )
}
