import { useState } from 'react';

import { GifList } from './gifs/components/GifList';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';

import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {
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

  return (
    <>
      {/* Header */}
      <CustomHeader
        title='Buscador de Gifs'
        description='Descubre y comparte el gif perfecto'
      />

      {/* Search */}
      <SearchBar
        placeholder='Busca lo que quieras'
        onQuery={handleSearch}
      />

      {/* Búsquedas previas */}
      <PreviousSearches searches={previuousTerms} onLabelClicked={handleTermClicked} />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
