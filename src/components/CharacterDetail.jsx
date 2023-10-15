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
    <div style={{ flex: 1 }}>
      {selectedCharacter && episodes && (
        <>
          <CharacterSubInfo
            character={selectedCharacter}
            isFavourite={isFavourite}
          />
          <EpisodeList episodes={episodes} />
        </>
      )}
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isFavourite }) {
  const dispatch = useDispatch();
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "M " : "F "}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch(addToFavourites({ character: character }))}
            className="btn btn--primary"
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
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSort((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sort ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {episodes &&
          sortedEpisodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, 0)} - {item.episode} :
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
