// import videoData from "../data/videos.json";

const getVideos = async (searchQuery) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const apiData = await response.json();

    if (apiData.error) {
      console.log("YouTube API error", apiData.error);
      return [];
    }

    const data = apiData.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getVideos;
