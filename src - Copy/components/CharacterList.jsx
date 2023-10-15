import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters, onSelectCharacter, selectedCharacter }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            onClick={() => onSelectCharacter(item.id)}
            className="icon red"
          >
            {item.id == selectedCharacter.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}
export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "male :" : "female :"}</span>
      <span>{item.name}</span>
    </h3>
  );
}
function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span
        className={`status ${item.status === "Alive" ? "green" : "red"}`}
      ></span>
      <span> {item.status}</span>
      <span>-{item.species}</span>
    </div>
  );
}
