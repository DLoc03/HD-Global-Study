import { useState, useCallback } from "react";
import { useApi } from ".";

export function usePosts() {
  const { get, loading, error } = useApi();
  const [posts, setPosts] = useState({ items: [], total: 0 });

  const getAll = useCallback(
    async (page = 1, limit = 10) => {
      try {
        const data = await get(`/post/?page=${page}&limit=${limit}`);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    },
    [get],
  );

  const getById = useCallback(
    async (id) => {
      try {
        const data = await get(`/post/get?id=${id}`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    [get],
  );

  const getBySlug = useCallback(
    async (slug) => {
      try {
        const data = await get(`/post/detail?slug=${encodeURIComponent(slug)}`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    [get],
  );

  return {
    posts,
    total: posts.totalItem,
    loading,
    error,
    getAll,
    getById,
    getBySlug,
  };
}
