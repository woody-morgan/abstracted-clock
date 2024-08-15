import { atom, DefaultValue, selectorFamily } from "recoil"

export const clockState = atom({
  key: "clock",
  default: new Date(),
})

export const worldClockState = selectorFamily({
  key: "worldClockState",
  get:
    (timeZone: string) =>
    ({ get }) => {
      const time = get(clockState)
      return new Date(time.toLocaleString("en-US", { timeZone }))
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(clockState, newValue instanceof DefaultValue ? newValue : new Date(newValue))
    },
})
