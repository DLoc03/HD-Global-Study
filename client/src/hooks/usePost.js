import { useState, useCallback } from "react";
import { useApi } from "../configs/api";

export function usePosts() {
  const { get, loading, error } = useApi();
  const [posts, setPosts] = useState({ items: [], total: 0 });

  const getAll = useCallback(
    async (
      page = 1,
      limit = 6,
      order = "DESC",
      status = "published",
      category_id = 1,
    ) => {
      try {
        const data = await get("/post/", {
          params: {
            page,
            limit,
            order,
            status,
            category_id,
          },
        });
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
