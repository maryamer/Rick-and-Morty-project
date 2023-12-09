// import { episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites } from "../features/characters/charactersSlice";
function CharacterDetail({}) {
  const { selectedCharacter, episodes, favourites } = useSelector(
    (state) => state.characters
  );
  const isFavourite =
    favourites &&
    favourites.map((fav) => fav.id).includes(selectedCharacter.id);
  useEffect(() => {
    // console.log(character, episodes);
  });
  return (
    <div className="flex md:flex-col mb-4 w-11/12 md:w-7/12">
      {selectedCharacter && episodes && (
        <div className="flex md:flex-col w-full rounded-lg">
          <CharacterSubInfo
            character={selectedCharacter}
            isFavourite={isFavourite}
          />
          <EpisodeList episodes={episodes} />
        </div>
      )}
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isFavourite }) {
  const dispatch = useDispatch();
  return (
    <div className="character-detail rounded-l-lg rounded-lg md:h-fit h-96 w-1/3 md:w-full">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img object-cover"
      />
      <div className="character-detail__info h-full flex flex-col md:p-2">
        <div className="my-4">
          <h3 className="name">
            {/* <span className="hidden md:flex">
              {character.gender === "Male" ? "Male " : "FeMale "}
            </span> */}
            <span className="md:font-bold">&nbsp;{character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span> - &nbsp;{character.species}</span>
          </div>
        </div>
        <div className="location hidden md:block">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch(addToFavourites({ character: character }))}
            className="btn--primary rounded-lg text-sm py-2"
            disabled={Boolean(isFavourite)}
          >
            {isFavourite ? "unfav" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sort, setSort] = useState(true);

  let sortedEpisodes;

  if (sort && episodes.length > 1) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else if (episodes.length > 1) {
    {
      sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
    }
  } else {
    sortedEpisodes = [episodes];
  }
  return (
    <div className="character-episodes md:mt-5 h-96 rounded-r-lg rounded-lg overflow-auto scrollbar-thin w-2/3 md:w-full">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSort((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sort ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul className="">
        {episodes &&
          sortedEpisodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, 0)} - {item.episode} :
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary hidden md:flex">
                {item.air_date}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
