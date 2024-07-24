import { useEffect, useState } from 'react'

const eightHoursInSeconds = 8 * 60 * 60

const CopiumClock: React.FC = () => {
  const target = new Date()
  target.setHours(9, 0, 0, 0)
  const [workStartTime, setWorkStartTime] = useState<Date>(target)
  const [secondsSinceWorkStartTime, setSecondsSinceWorkStartTime] = useState<number>(0)
  const [takeHomeMonthlySalary, setTakeHomeMonthlySalary] = useState<number>(4000)
  const [dailyAmount, setDailyAmount] = useState<number>(0)
  const [hourlyAmount, setHourlyAmount] = useState<number>(0)
  const [minutelyAmount, setminutelyAmount] = useState<number>(0)
  const [secondlyAmount, setSecondlyAmount] = useState<number>(0)
  const [amountMadeToday, setAmountMadeToday] = useState<number>(0)

  useEffect(() => {
    setDailyAmount(takeHomeMonthlySalary / 20) // 20 working days in a month
    setHourlyAmount(takeHomeMonthlySalary / 20 / 8)
    setminutelyAmount(takeHomeMonthlySalary / 20 / 8 / 60)
    setSecondlyAmount(takeHomeMonthlySalary / 20 / 8 / 60 / 60)
  }, [takeHomeMonthlySalary, workStartTime, secondsSinceWorkStartTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceWorkStartTime(Math.floor((new Date().getTime() - workStartTime.getTime()) / 1000))
      if (secondsSinceWorkStartTime >= eightHoursInSeconds) {
        setAmountMadeToday(dailyAmount)
      } else {
        setAmountMadeToday(secondlyAmount * secondsSinceWorkStartTime)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [dailyAmount, workStartTime, secondlyAmount, amountMadeToday, secondsSinceWorkStartTime])

  return (
    <div>
      <div className="text-9xl">
        {format(amountMadeToday)}
      </div>
      <div className="text-xl">
        <p>
          Work start {workStartTime.toLocaleTimeString()}
        </p>
        <p>Month {format(takeHomeMonthlySalary, 0, 0)} </p>
        <p>Day {format(dailyAmount, 0, 0)} </p>
        <p>Hour {format(hourlyAmount)} </p>
        <p>Min {format(minutelyAmount)} </p>
        <p>Sec {format(secondlyAmount, 3, 3)} </p>
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