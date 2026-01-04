import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useGifs } from './useGifs';

describe('useGifs', () => {
    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previuousTerms.length).toBe(0);
        expect(result.current.handleTermClicked).toBeDefined();
        expect(result.current.handleSearch).toBeDefined();
    })

    test('should return a list of gifs when handleSearch is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('goku');
        });

        expect(result.current.gifs.length).toBe(10);

    });

    test('should return a list of gifs when handleTerClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('goku')
        })

        expect(result.current.gifs.length).toBe(10);
    })
})