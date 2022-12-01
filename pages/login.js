import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "../styles/Login.module.css";

const Login = () => {
  // Hooks
  const [userMessage, setUserMessage] = useState("");
  const [email, setEmail] = useState("");

  // Component Logic
  function handleLoginWithEmail(e) {
    e.preventDefault();
    if (email) {
      // Route to dashboard
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
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            onChange={handleEmailChange}
            className={styles.emailInput}
            type="text"
            placeholder="Email Address"
          />
          <p className={styles.userMsg}>{userMessage}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
