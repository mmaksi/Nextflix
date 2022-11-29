import "../styles/globals.css";
import { Roboto_Slab } from "@next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

/**
 * To use different weights of RobotoSlab go to:
 * https://nextjs.org/docs/api-reference/next/font#css-variables
 */

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={robotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
