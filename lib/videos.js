// import videoData from "../data/videos.json";

const getCommonVideos = async (url) => {
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
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
      };
    });
    return data;
  } catch (error) {
    console.log("error while fetching YouTube videos");
  }
};

export const getVideos = async (searchQuery) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`;

  return await getCommonVideos(url);
};

export const getPopularVideos = async () => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  try {
    const popularVideos = await fetch(url);
    return popularVideos;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoById = async (videoId) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  const data = await getCommonVideos(url);
  console.log(data);
  return data;
};
