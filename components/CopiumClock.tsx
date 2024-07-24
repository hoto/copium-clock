import { useEffect, useState } from 'react'

const CopiumClock: React.FC = () => {
  const target = new Date()
  target.setHours(8, 0, 0, 0)
  const [workStartTime, setWorkStartTime] = useState<Date>(target)
  const [secondsSinceWorkStartTime, setSecondsSinceWorkStartTime] = useState<number>(0)
  const [takeHomeMonthlySalary, setTakeHomeMonthlySalary] = useState<number>(5000)
  const [dailyAmount, setDailyAmount] = useState<number>(0)
  const [hourlyAmount, setHourlyAmount] = useState<number>(0)
  const [minutlyAmount, setMinutlyAmount] = useState<number>(0)
  const [secondlyAmount, setSecondlyAmount] = useState<number>(0)
  const [amountMadeToday, setAmountMadeToday] = useState<number>(70.00)

  useEffect(() => {
    const interval = setInterval(() => {
      setAmountMadeToday(amount => amount + 0.01)
      setSecondsSinceWorkStartTime(Math.floor((new Date().getTime() - workStartTime.getTime()) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setDailyAmount(takeHomeMonthlySalary / 20) // 20 working days in a month
    setHourlyAmount(dailyAmount / 8)
    setMinutlyAmount(hourlyAmount / 60)
    setSecondlyAmount(minutlyAmount / 60)
  }, [workStartTime, secondsSinceWorkStartTime])

  return (
    <div>
      <div className="text-9xl">
        {format(amountMadeToday)}
      </div>
      <div className="text-xl">
        <p>
          Work start time: {workStartTime.toLocaleTimeString()}
        </p>
        <p>Take home monthly: {format(takeHomeMonthlySalary, 0, 0)} </p>
        <p>Daily: {format(dailyAmount, 0, 0)} </p>
        <p>Hourly: {format(hourlyAmount)} </p>
        <p>Minutly: {format(minutlyAmount.toFixed())} </p>
        <p>Secondly: {format(secondlyAmount.toFixed(3))} </p>
        <br/>
        <p>Seconds passed: {secondsSinceWorkStartTime} </p>
      </div>
    </div>
  )
}


const format = (amount: number | string, min = 2, max = 2): string => {
  return '£' + new Intl
    .NumberFormat('en-GB', { minimumFractionDigits: min, maximumFractionDigits: max })
    .format(Number(amount))
}
export default CopiumClock