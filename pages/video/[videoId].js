import { useRouter } from "next/router";
import React from "react";

const Video = () => {
  const router = useRouter();

  const { videoId } = router.query;

  return <div>Videos {videoId}</div>;
};

export default Video;
