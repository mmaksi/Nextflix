import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./navbar.module.css";

const NavBar = ({ username }) => {
  // Hooks
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(showDropdown);

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
            <button className={styles.usernameBtn}>
              <p className={styles.username} onClick={toggleDropdown}>
                {username}
              </p>
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
              <div>
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
