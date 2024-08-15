import React, { FunctionComponent } from "react"
import { useRecoilValue } from "recoil"
import { Clock } from "components/atom/Clock"
import { ToolTip } from "components/atom/ToolTip"
import { useRecoilInterval } from "hooks"
import { worldClockState } from "store/clock"

const UPDATE_INTERVAL = 1000

const ToolTipTrigger = () => {
  const [clock] = useRecoilInterval(worldClockState("ASIA/SEOUL"), (setState) => setState(new Date()), UPDATE_INTERVAL)

  return (
    <ToolTip.Trigger>
      <Clock.Root time={clock}>
        <Clock.Face>
          <Clock.HourHand className="bg-blue-500" />
          <Clock.MinuteHand />
          {/* 초침은 Optional */}
          {/* 주석처리시 초침 on off 가능 */}
          <Clock.SecondHand />
        </Clock.Face>
      </Clock.Root>
    </ToolTip.Trigger>
  )
}

const ToolTipContent = () => {
  const clock = useRecoilValue(worldClockState("ASIA/SEOUL"))

  return (
    <ToolTip.Content>
      {clock.toLocaleString("ko-KR", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })}
    </ToolTip.Content>
  )
}

export const ClockWithTooltip: FunctionComponent = () => {
  return (
    <ToolTip.Root>
      <ToolTipTrigger />
      <ToolTipContent />
    </ToolTip.Root>
  )
}
