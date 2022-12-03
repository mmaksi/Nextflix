import "../styles/globals.css";
import { Roboto_Slab } from "@next/font/google";
import { useEffect, useState } from "react";
import magic from "../lib/magic-client";
import { useRouter } from "next/router";
import Loader from "../components/loader/loader";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/**
 * To use different weights of RobotoSlab go to:
 * https://nextjs.org/docs/api-reference/next/font#css-variables
 */

export default function MyApp({ Component, pageProps }) {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // async function checkUser() {
    //   const isLoggedIn = await magic.user.isLoggedIn();
    //   if (isLoggedIn) {
    //     router.push("/");
    //   } else {
    //     router.push("/login");
    //   }
    // }
    // checkUser();
  }, []);

  useEffect(() => {
    /**
     * Setting loading state to false after route change event is complete
     * for better UX
     */
    const handleRouteChange = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    };
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <main className={robotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
