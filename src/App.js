import "./App.css";
import youtube from "./api/youtube.js";
import { Grid } from "@mui/material";
import SearchBar from "./components/SearchBar.jsx";
import { useState } from "react";
import VideoDetail from "./components/VideoDetail.jsx";
import VideoList from "./components/VideoList.jsx";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ id: {}, snippet: {} });

  return (
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function handleSubmit(searchTerm) {
    try {
      const {
        data: { items: videos },
      } = await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 5,
          key: "AIzaSyC0NlbgAFLS8mZ_Si50sukT37exIPeiMcc",
          q: searchTerm,
        },
      });
  
      setVideos(videos);
      if (videos.length > 0) {
        setSelectedVideo(videos[0]); // Set the first video as selected
      } else {
        setSelectedVideo(null); // Handle empty video list
      }
    } catch (error) {
      console.error("Error fetching Youtube videos:", error);
    }
  }

export default App;
