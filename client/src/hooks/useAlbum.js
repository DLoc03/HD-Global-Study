import { useState, useCallback } from "react";
import { useApi } from ".";

export function useAlbums() {
  const { get, loading, error } = useApi();
  const [albums, setAlbums] = useState({
    items: [],
    total: 0,
    totalPage: 0,
    currentPage: 1,
  });

  const getPreview = useCallback(
    async (page = 1, limit = 10) => {
      try {
        const data = await get(`/album/preview?page=${page}&limit=${limit}`);
        setAlbums({
          items: data.items || [],
          total: data.totalItem || 0,
          totalPage: data.totalPage || 1,
          currentPage: data.currentPage || page,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [get],
  );

  const getAlbum = useCallback(
    async (id) => {
      try {
        const data = await get(`/album/get?id=${id}`);
        return data.album || null;
      } catch (err) {
        console.log(err);
      }
    },
    [get],
  );

  return {
    albums: albums.items,
    total: albums.total,
    totalPage: albums.totalPage,
    currentPage: albums.currentPage,
    loading,
    error,
    getPreview,
    getAlbum,
  };
}
