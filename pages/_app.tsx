import { AppProps } from "next/app"

import "../styles/tailwind.css"
import "@radix-ui/themes/styles.css"
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
