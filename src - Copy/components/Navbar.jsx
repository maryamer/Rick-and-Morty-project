import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "./CharacterList";
import Modal from "./Modal";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <Logo />

      {children}
    </nav>
  );
};

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export function Favourites({
  favourites,
  onSelectCharacter,
  removeFavouriteHandler,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="hello world">
        {favourites.map((item) => (
          <Character item={item} key={item.id}>
            <button
              className="icon red"
              onClick={() => removeFavouriteHandler(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span
          className="
        badge"
        >
          {favourites.length}
        </span>
      </button>
    </>
  );
}
export function Logo() {
  return <div className="navbar__logo">LOGO</div>;
}
