import { useEffect } from "react";
import { useState } from "react";
// import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search } from "./components/Navbar";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { split } from "postcss/lib/list";
import Modal from "./components/Modal";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncCharacters } from "./features/characters/charactersSlice";

function App() {
  const { query, loading, characterLoading } = useSelector(
    (state) => state.characters
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncCharacters());
  }, []);
  const { isLoading } = useCharacter(
    "https://rickandmortyapi.com/api/character?name",
    query
  );

  return (
    <div className="app max-w-5xl md:m-auto flex flex-col md:h-screen  md:overflow-hidden ">
      <Toaster />
      <Navbar />
      <div className="main flex flex-col-reverse justify-center items-center md:items-start md:flex-row md:justify-around">
        {loading ? <Loader /> : <CharacterList />}
        {characterLoading ? <Loader /> : <CharacterDetail />}
      </div>
    </div>
  );
}
export default App;

// useEffect(() => {
//   fetch("https://rickandmortyapi.com/api/character")
//     .then((res) => {
//       if (!res.ok) throw new Error("something went wrong");
//       console.log(res);
//       console.log(res.json());
//       return res.json();
//     })
//     .then((data) => setCharacters(data.results.slice(0, 9)))
//     .catch((err) => {
//       toast.error(err.message);
//     });
// }, []);

// useEffect(() => {
//   async function fetchData() {
//     try {
//       setIsLoading(true);
//       const res = await fetch(
//         `https://rickandmortyapi.com/api/character?name=${query}`
//       );
//       if (!res.ok) throw new Error("something went wrong");
//       const data = await res.json();
//       setCharacters(data.results.slice(0, 8));
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   fetchData();
// }, [query]);

// axios
