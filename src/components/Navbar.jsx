import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavourite,
  searchCharacters,
} from "../features/characters/charactersSlice";
import { Character } from "./CharacterList";
import Modal from "./Modal";

const Navbar = ({ children }) => {
  const { characters } = useSelector((state) => state.characters);

  return (
    <nav className="navbar min-w-fit p-2">
      <Logo />
      {children}
      <Search />
      <div className="navbar__result hidden md:flex">
        Found {characters?.length} characters
      </div>
      <Favourites />
    </nav>
  );
};

export default Navbar;

export function Search() {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="text-field p-2 md:p-3"
      placeholder="search..."
      onChange={(e) => dispatch(searchCharacters({ query: e.target.value }))}
    />
  );
}
export function Favourites() {
  const { favourites } = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="hello world">
        {favourites &&
          favourites.map((item) => (
            <Character item={item} key={item.id}>
              <button
                className="icon red"
                onClick={() => dispatch(deleteFavourite({ id: item.id }))}
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
          {favourites && favourites.length}
        </span>
      </button>
    </>
  );
}
export function Logo() {
  return <div className="navbar__logo">LOGO</div>;
}
