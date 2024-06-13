import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';

interface Product {
    title: string;
}

function SearchBar() {
    const [filteredData, setFilteredData] = useState<Product[]>([]); // Explicitly set the type
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://dummyjson.com/products/search?q=' + value);
                setSuggestions(data.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [value]);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setFilteredData(
            suggestions.filter((item) =>
                item.title.toLowerCase().includes(searchWord.toLowerCase())
            )
        )
    }

    return (
        <div className="search">
            <div className="search-Inputs">
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    <SearchIcon />
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="search-Results">
                    {filteredData.map((product, index) => (
                        <a key={index}>{product.title}</a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
