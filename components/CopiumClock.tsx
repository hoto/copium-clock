import { useEffect, useState } from 'react'

const CopiumClock: React.FC = () => {
  const [amount, setAmount] = useState<number>(70.01)

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(amount => {
        const newAmount= amount + 0.01
        return parseFloat(newAmount.toFixed(2))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-9xl">
      {amount}£
    </div>
  )
}

export default CopiumClock