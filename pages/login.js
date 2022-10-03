import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { magic } from "../lib/magic_client";

const Login = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChanageComplete", handleComplete);
    router.events.on("routeChanageError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChanageError", handleComplete);
    };
  }, [router]);

  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(emailAddress);
  }
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
    e.preventDefault();
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isValidEmailAddress(email)) {
      // route to dashboard
      try {
        const didToken = await magic.auth.loginWithMagicLink({ email });
        console.log({ didToken });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        console.log("Something went wrong", error);
        setIsLoading(false);
      }
      // router.push("/");
    } else {
      //show error message
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            id="emailInput"
          />
          <p className={styles.userMsg}> {userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading ..." : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
