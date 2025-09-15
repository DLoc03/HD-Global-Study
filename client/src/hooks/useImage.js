import { useCallback } from "react";
import { useApi } from "../configs/api";

export function useImages() {
  const { get, loading, error } = useApi();

  const getByAlbum = useCallback(
    async (albumId, page = 1, limit = 20) => {
      try {
        const data = await get(
          `image/byAlbum?album_id=${albumId}&page=${page}&limit=${limit}`,
        );
        return {
          items: data.items || [],
          totalItem: data.totalItem || 0,
          totalPage: data.totalPage || 1,
          currentPage: data.currentPage || page,
        };
      } catch (err) {
        console.error(err);
        return { items: [], totalItem: 0, totalPage: 1, currentPage: page };
      }
    },
    [get],
  );

  return { loading, error, getByAlbum };
}
