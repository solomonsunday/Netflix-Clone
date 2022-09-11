import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/banner";
import Card from "../components/card/card";
import SectionCards from "../components/card/Section-Cards";
import Navbar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";

import { getVideo } from "../lib/videos";

export default function Home() {
  const disneyVideos = getVideo();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username="solomon@thedrycleanersson.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards
          title="Productivity"
          videos={disneyVideos}
          size="medium"
        />
      </div>
    </div>
  );
}
