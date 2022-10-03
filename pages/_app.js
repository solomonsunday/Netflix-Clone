import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { magic } from "../lib/magic_client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function checkIsLoggedIn() {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          router.push("/");
          // setIsLoading(false);
        } else {
          router.push("/login");
          setIsLoading(false);
        }
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
      }
    }
    checkIsLoggedIn();
  }, []);

  // TODO : Fixes the login and loader flicker thing...

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
  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
