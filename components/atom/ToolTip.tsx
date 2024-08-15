import { Flex } from "@radix-ui/themes"
import React, { FunctionComponent, useRef } from "react"
import { useHover, useIsomorphicLayoutEffect, useMousePosition } from "hooks"

// =========== Tooltip Context for Compound Pattern ===========

type ToolTipContextType = {
  hover: {
    x: number
    y: number
  } | null
  setHover?: React.Dispatch<
    React.SetStateAction<{
      x: number
      y: number
    } | null>
  >
}

const ToolTipContext = React.createContext<ToolTipContextType>({
  hover: null,
  setHover: undefined,
})
const useToolTipContext = () => React.useContext(ToolTipContext)

const Root: FunctionComponent<{
  children: React.ReactNode
}> = ({ children }) => {
  const [hover, setHover] = React.useState<{
    x: number
    y: number
  } | null>(null)
  return <ToolTipContext.Provider value={{ hover, setHover }}>{children}</ToolTipContext.Provider>
}

const Trigger: FunctionComponent<{
  children: React.ReactNode
}> = ({ children }) => {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [x, y, bind] = useMousePosition()

  const { setHover } = useToolTipContext()

  // Update mouse hover position
  useIsomorphicLayoutEffect(() => {
    if (!setHover) return
    if (isHover) {
      setHover({
        x,
        y,
      })
    } else {
      setHover(null)
    }
  }, [isHover, setHover, x, y])

  return (
    <Flex display="inline-flex" ref={hoverRef} {...bind}>
      {children}
    </Flex>
  )
}

// select position
const selectPosition: Record<
  "top-right" | "top-left" | "bottom-right" | "bottom-left",
  {
    top: number
    left: number
  }
> = {
  "top-right": {
    top: -30,
    left: 20,
  },
  "top-left": {
    top: -30,
    left: -20,
  },
  "bottom-right": {
    top: 30,
    left: 20,
  },
  "bottom-left": {
    top: 30,
    left: -20,
  },
}

const Content: FunctionComponent<{
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  children: React.ReactNode
}> = ({ position = "top-right", children }) => {
  const selectedPosition = selectPosition[position]
  const { hover } = useToolTipContext()

  return (
    <>
      {hover && (
        <div
          className="fixed overflow-hidden"
          style={{
            top: `${hover.y + selectedPosition.top}px`,
            left: `${hover.x + selectedPosition.left}px`,
          }}
        >
          {children}
        </div>
      )}
    </>
  )
}

export const ToolTip = {
  Root,
  Trigger,
  Content,
}
