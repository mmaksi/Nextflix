import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import magic from "../lib/magic-client";

import styles from "../styles/Login.module.css";

const Login = () => {
  // Hooks
  const [userMessage, setUserMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  // Component Logic
  async function handleLoginWithEmail(e) {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });
          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMessage("Enter a valid email");
          }
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Something went wrong", error);
        setIsLoading(false);
      }
    } else {
      // Show user message
      setIsLoading(false);
      setUserMessage("Enter a valid email");
    }
  }

  function handleEmailChange(e) {
    setUserMessage("");
    const input = e.target.value;
    setEmail(input);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <form className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            onChange={handleEmailChange}
            className={styles.emailInput}
            type="text"
            placeholder="Email Address"
          />
          <p className={styles.userMsg}>{userMessage}</p>
          <button
            type="submit"
            className={styles.loginBtn}
            onClick={handleLoginWithEmail}
          >
            {isLoading ? "Please wait..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
