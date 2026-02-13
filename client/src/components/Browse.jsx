import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import { getNowPlayingMovies } from "../redux/movieSlice";

export default function Browse() {
  const user = useSelector((store) => store.app.user);
  const movie = useSelector((store) => store.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowPlaying = async () => {
    try {
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzhkMDA4M2Y2MzJmOWYxMGRlNWZjOGVmOWNkMmNlMSIsIm5iZiI6MTc2MzY4MjA4NS4xMDA5OTk4LCJzdWIiOiI2OTFmYTcyNWZhNDc3NTgzNzUwNThhMjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LH1OIaldqjA3Y3nIsesZ8gRxz0kbBOWeoVzFDRseL1I",
        },
      };

      const res = await fetch(url, options);
      if (!res.ok) {
        const err = await res.json();
        console.log(err.message);
      }

      const data = await res.json();
      console.log(data.results);

      dispatch(getNowPlayingMovies(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    nowPlaying();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <MainContainer />
        <MovieContainer />
      </div>
    </div>
  );
}
