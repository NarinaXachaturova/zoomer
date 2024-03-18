import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

/* Icons */
import SearchIcon from "../icons/SearchIcon";

/* Services */
import { getProducts } from "../../services/services";

export default function SearchBar() {
  const [input, setInput] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (input.trim() !== "") {
        fetchData(input);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [input]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchData = async (query) => {
    try {
      const response = await getProducts({ search: query }, false);
      setSearchResults(response.data.products);

      const filteredResults = response.data.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <div className="flex gap-4 w-[400px] h-[44px] items-center border border-opacity-50 border-primary bg-[#fff] rounded-lg p-3 cursor-pointer">
        <SearchIcon />

        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="ძიება"
          className="text-darkgrey h-[17px] text-[13px] font-bold outline-none"
        />
      </div>

      {searchResults.length > 0 && (
        <ul className="flex flex-col gap-y-5 absolute z-10 left-0 mt-1 w-[400px] rounded-md bg-white border border-gray-200">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="flex items-start p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleResultClick(result.id)}
            >
              <img
                src={result.image}
                alt={result.title}
                className="w- h-12 object-cover mr-4 rounded-md"
              />

              <div>
                <div className="text-sm font-medium text-darkgrey">
                  {result.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
