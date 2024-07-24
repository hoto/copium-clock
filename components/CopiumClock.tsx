import { useEffect, useState } from 'react'

const CopiumClock: React.FC = () => {
  const [amount, setAmount] = useState<number>(70.00)

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(amount => amount + 0.01)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-9xl">
      £{new Intl
      .NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .format(amount)}
    </div>
  )
}

export default CopiumClock