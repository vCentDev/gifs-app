import { useState } from 'react';

import { GifList } from './gifs/components/GifList';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';

import { mockGifs } from './mock-data/gifs.mock';

export const GifsApp = () => {

  const [previuousTerms, setPreviousTerms] = useState(['dragon ball z']);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  }

  const handleSearch = (query: string) => {
    console.log({ query });
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
      <GifList gifs={mockGifs} />
    </>
  );
};
