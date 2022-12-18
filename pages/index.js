import Head from "next/head";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/sectionCards";
import NavBar from "../components/navbar/navbar";
import { getVideos, getWatchItAgainVideos } from "../lib/videos";
import styles from "../styles/Home.module.css";
import { redirectUser } from "../utils/redirectUser";

export async function getServerSideProps(context) {
  // Component Logic
  const { userId, token } = await redirectUser(context);
  // If there is no authenticated user, redirects to login page
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
    const disneyVideos = await getVideos("modern disney trailer");
    const travelVideos = await getVideos("travel");
    const productivityVideos = await getVideos("productivity");
    // const popularVideos = await getVideos("travel");
    return {
      props: {
        disneyVideos,
        travelVideos,
        productivityVideos,
        watchItAgainVideos,
      },
    };
  }
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  watchItAgainVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Banner
        videoId="aeVkbNka9HM"
        title="White Chicks"
        subTitle="Cynthia's Favourite movie"
        imgUrl="/static/white-chicks.jpg"
      />

      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Disney"
          videos={disneyVideos}
          size="large"
        ></SectionCards>

        {watchItAgainVideos.length > 0 && (
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
        )}

        <SectionCards
          title="Travel"
          videos={travelVideos}
          size="small"
        ></SectionCards>

        <SectionCards
          title="Productivity"
          videos={productivityVideos}
          size="medium"
        ></SectionCards>

        {/* <SectionCards
          title="popular"
          videos={disneyVideos}
          size="small"
        ></SectionCards> */}
      </div>
    </div>
  );
}
