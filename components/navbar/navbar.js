import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import magic from "../../lib/magic-client";

import styles from "./navbar.module.css";

const NavBar = () => {
  // Hooks
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getEmailAddress() {
      try {
        const didToken = await magic.user.getIdToken();
        const { email } = await magic.user.getMetadata();
        if (email) setUsername(email);
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    }
    getEmailAddress();
  }, []);

  // Event handlers
  const homeClickHandler = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const listClickHandler = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={homeClickHandler}>
            Home
          </li>
          <li className={styles.navItem2} onClick={listClickHandler}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={toggleDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="expand icon"
                width={24}
                height={24}
                style={{ marginLeft: "5px" }}
              />
              {/* more icons */}
            </button>
          </div>

          {showDropdown && (
            <div className={styles.navDropdown}>
              <div onClick={handleSignOut}>
                <Link className={styles.linkName} href="/login">
                  Sign Out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
