import { useState } from "react";

import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";


export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previuousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log({ term });
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();

        if (query.length === 0) return;

        if (previuousTerms.includes(query)) {
            console.warn('El término introducido ya existe!');
            return;
        }

        setPreviousTerms([query, ...previuousTerms].slice(0, 3));

        const gifs = await getGifsByQuery(query);
        console.log(gifs);
        setGifs(gifs)
    }

    return {
        gifs,
        previuousTerms,
        handleTermClicked,
        handleSearch
    }
}