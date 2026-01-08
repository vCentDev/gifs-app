import { describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import * as gifActions from '../actions/get-gifs-by-query.action';
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

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs())

        await act(async () => {
            await result.current.handleTermClicked('goku')
        })

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'))

        await act(async () => {
            await result.current.handleTermClicked('goku')
        })

        expect(result.current.gifs.length).toBe(10)
    })

    test('should return no more than 3 previous terms', async () => {
        const { result } = renderHook(() => useGifs())

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('goku')
            await result.current.handleSearch('vegeta')
            await result.current.handleSearch('krilin')
            await result.current.handleSearch('bulma')
        })

        expect(result.current.previuousTerms.length).toBe(3);
        expect(result.current.previuousTerms).toStrictEqual(['bulma', 'krilin', 'vegeta'])
    })
})