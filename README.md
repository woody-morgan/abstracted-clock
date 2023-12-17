# abstracted-clock

## Goal

The goal of this project is to create a example of compound pattern usage and atomic design synthesis.
And also best practices of custom hooks of event listeners.

## How to run

```bash

yarn install
yarn dev

```

## How to Customize the clock

you can check the architecture design in components/atom/Clock.tsx

and you can check the synthesized component of Clock and Tooltip in components/molecules/ClockWithTooltip.tsx

I hope you enjoy this project

ps: you can check how to reuse css variables in components/atom/Clock.tsx using cva(like recipe grammar of vanilla-extract css)

## Things to think about

1. Why compound pattern is useful?
2. Do we need to take this level of abstraction? Additionally, when does it need for us to design frontend projects
3. is there any better way for component synthesis?
4. type safety for compound pattern applied component
5. how to make custom hooks more reusable?
