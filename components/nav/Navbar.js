import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { magic } from "../../lib/magic_client";

const Navbar = (props) => {
  const { username } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  const [userName, setUserName] = useState();
  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  useEffect(() => {
    async function getUserName() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          console.log({ email });

          setUserName(email);
        }
      } catch (error) {
        console.log({ error });
        console.log("error retriving email", error);
      }
    }
    getUserName();
  }, []);

  const handleToggleDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.log({ error });
    }
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
              <p className={styles.username}>
                {userName ? userName : "User Name"}
              </p>
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
                <div>
                  <Link href="/login">
                    <a className={styles.linkName} onClick={handleSignout}>
                      Sign Out
                    </a>
                  </Link>
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
