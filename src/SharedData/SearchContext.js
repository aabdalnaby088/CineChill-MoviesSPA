import { createContext, useState, useContext } from "react";

export let SearchContext = createContext();

export function SearchContextProvider({ children }) {
    let [searchQuery, setSearchQuery] = useState('');
    let [searchBar , setSearchBar] = useState(true)

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchBar, setSearchBar }}>
            {children}
        </SearchContext.Provider>
    );
}