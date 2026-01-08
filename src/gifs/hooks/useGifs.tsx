import { useRef, useState } from "react";

import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";


export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previuousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);

        gifsCache.current[term] = gifs;

    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();

        if (query.length === 0) return;

        if (previuousTerms.includes(query)) {
            console.warn('El término introducido ya existe!');
            return;
        }

        setPreviousTerms(prev => [query, ...prev].slice(0, 3));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs)

        gifsCache.current[query] = gifs;
    }

    return {
        gifs,
        previuousTerms,
        handleTermClicked,
        handleSearch
    }
}