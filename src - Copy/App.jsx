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

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters, setCharacters, setIsLoading } = useCharacter(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedCharacter, setSelectedCharacter] = useState({
    id: -1,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    location: {
      name: "xyr",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  });
  const [episodes, setEpisodes] = useState("");
  const [favourites, setFavourites] = useLocalStorage(
    "favourite-characters",
    []
  );

  const handleSelectCharacter = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const episodesId = data.episode.map((e) => e.split("/").at(-1));
      const { data: episodes } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );

      setEpisodes([episodes].flat());
      setSelectedCharacter(data);
    } catch (error) {
      // toast.error(error.response.data.error);
      setEpisodes([]);
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };
  const addToFavouritesHandler = (character) => {
    setFavourites((prevFav) => [...prevFav, selectedCharacter]);
  };
  const removeFavouriteHandler = (characterId) => {
    setFavourites((prevFav) =>
      prevFav.filter((item) => item.id !== characterId)
    );
  };

  const isFavourite = favourites
    .map((fav) => fav.id)
    .includes(selectedCharacter.id);

  return (
    <div className="app">
      <Toaster />

      <Navbar numOfResult={characters.length}>
        <Search query={query} setQuery={setQuery} />
        <div className="navbar__result">
          Found {characters.length} characters
        </div>
        <Favourites
          favourites={favourites}
          onSelectCharacter={handleSelectCharacter}
          removeFavouriteHandler={removeFavouriteHandler}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          onSelectCharacter={handleSelectCharacter}
          selectedCharacter={selectedCharacter}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterDetail
            episodes={episodes}
            selectedCharacter={selectedCharacter}
            onAddToFavourites={addToFavouritesHandler}
            isFavourite={isFavourite}
          />
        )}
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
