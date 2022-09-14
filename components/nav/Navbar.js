import React, { useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Navbar = (props) => {
  const { username } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleToggleDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="124px"
              height="34px"
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleToggleDropDown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/downarrow.svg"
                alt="down arrow"
                width="24px"
                height="24px"
              />
              {/* {expand more icon} */}
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <Link href="/login">
                  <a className={styles.linkName}>Sign Out</a>
                </Link>
                <div>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
