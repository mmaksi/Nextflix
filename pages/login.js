import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import magic from "../lib/magic-client";

import styles from "../styles/Login.module.css";

const Login = () => {
  // Hooks
  const [userMessage, setUserMessage] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Component Logic
  async function handleLoginWithEmail(e) {
    e.preventDefault();
    if (email) {
      // await magic.auth.loginWithMagicLink({ email: "your.email@example.com" });

      if (email === "mmaksi.dev@gmail.com") {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            router.push("/");
          }
        } catch (error) {
          // Handle errors if required!
          console.log("Something went wrong", error);
        }
      } else {
        setUserMessage("Something went wrong logging in");
      }
    } else {
      // Show user message
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
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
