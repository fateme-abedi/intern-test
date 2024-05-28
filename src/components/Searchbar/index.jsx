import React, { useState } from "react";
import searchIcon from '../../assets/search.png'
import crossIcon from '../../assets/cross.png'


export default function SearchBar({ searchQuery, setSearchQuery }) {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleDeleteInput = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex items-center bg-gray-500 m-auto rounded-md p-2 w-[90%] max-[375px]:w-full">
      <span>
        <img
          src={searchIcon}
          alt="search"
          className="w-6 h-6 mr-2"
        />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="فیلم، سریال، بازیگر و ژانر"
        className="flex-grow bg-transparent outline-none py-2 px-1 text-white text-right font-sans text-lg placeholder:font-bold max-[768px]:placeholder: font-normal max-[768px]:text-sm"
      />
      {searchQuery && (
        <span onClick={handleDeleteInput} className="cursor-pointer ml-auto">
          <img
            src={crossIcon}
            alt="delete"
            className="deleteIcon w-6 h-6"
          />
          <img
          
          />
        </span>
      )}
    </div>
  );
}
