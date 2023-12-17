import { cva } from "class-variance-authority"
import React, { forwardRef, FunctionComponent, useMemo } from "react"
import { twMerge } from "tailwind-merge"

// =========== Clock CSS ===========

const indicator = cva(["absolute", "font-bold"], {
  variants: {
    type: {
      "1": ["top-[10%]", "right-[26%]"],
      "2": ["top-[25%]", "right-[10%]"],
      "3": ["right-[10px]", "top-[46%]"],
      "4": ["right-[30px]", "top-[67%]"],
      "5": ["top-[80%]", "right-[78px]"],
      "6": ["bottom-[10px]", "left-[50%]"],
      "7": ["top-[82%]", "left-[80px]"],
      "8": ["top-[67%]", "left-[30px]"],
      "9": ["top-[46%]", "left-[10px]"],
      "10": ["top-[25%]", "left-[10%]"],
      "11": ["top-[10%]", "left-[26%]"],
      "12": ["top-[10px]", "left-[46%]"],
    },
  },
  defaultVariants: {
    type: "1",
  },
})

const hand = cva(["absolute", "rounded-lg", "origin-bottom"], {
  variants: {
    unit: {
      hour: ["w-[6px]", "h-[60px]", "top-[30%]", "left-[49%]", "bg-gray-700"],
      minute: ["w-[4px]", "h-[80px]", "top-[22.5%]", "left-[49%]", "bg-gray-500"],
      second: ["w-[2px]", "h-[118px]", "top-[10.5%]", "left-1/2", "bg-red-400"],
    },
  },
  defaultVariants: {
    unit: "hour",
  },
})

// =========== Clock Context for Compound Pattern ===========

const ClockContext = React.createContext<Date>(new Date())
const useClockContext = () => React.useContext(ClockContext)

const ClockCenter = () => (
  <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-white bg-gray-400" />
)

// =========== Clock ===========

const Root: FunctionComponent<{
  time: Date
  children: React.ReactNode
}> = ({ time, children }) => {
  return <ClockContext.Provider value={time}>{children}</ClockContext.Provider>
}

const ClockFace = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const indicators = useMemo(() => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const, [])
    return (
      <div className={twMerge("relative h-[300px] w-[300px] rounded-full shadow-2xl", className)} {...props} ref={ref}>
        {children}
        <ClockCenter />
        {indicators.map((i) => (
          <div key={`clock-face-indicator-${i}`} className={twMerge(indicator({ type: i }))}>
            {i}
          </div>
        ))}
      </div>
    )
  }
)
ClockFace.displayName = "ClockFace"

const HourHand: FunctionComponent<{
  className?: string
}> = ({ className }) => {
  const time = useClockContext()
  const hour = time.getHours() % 12
  return (
    <div
      className={twMerge(
        hand({
          unit: "hour",
        }),
        className
      )}
      style={{
        transform: `rotate(${hour * 30}deg)`,
      }}
    />
  )
}

const MinuteHand: FunctionComponent<{
  className?: string
}> = ({ className }) => {
  const time = useClockContext()
  const minute = time.getMinutes()
  return (
    <div
      className={twMerge(
        hand({
          unit: "minute",
        }),
        className
      )}
      style={{
        transform: `rotate(${minute * 6}deg)`,
      }}
    />
  )
}

const SecondHand: FunctionComponent<{
  className?: string
}> = ({ className }) => {
  const time = useClockContext()
  const second = time.getSeconds()
  return (
    <div
      className={twMerge(
        hand({
          unit: "second",
        }),
        className
      )}
      style={{
        transform: `rotate(${second * 6}deg)`,
      }}
    />
  )
}

export const Clock = {
  Root,
  Face: ClockFace,
  HourHand,
  MinuteHand,
  SecondHand,
  Make: Root,
  Skeleton: ClockFace,
}
