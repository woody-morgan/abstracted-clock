import { Flex } from "@radix-ui/themes"
import Head from "next/head"
import { ClockWithTooltip } from "components/molecule/ClockWithTooltip"

export default function Web() {
  return (
    <>
      <Head>
        <title>Clock</title>
      </Head>
      <div className="h-screen w-full">
        <Flex justify="center" align="center" width="100%" height="100%">
          <ClockWithTooltip />
        </Flex>
      </div>
    </>
  )
}
