import { useState, useEffect } from "react";
import { bnsToIds } from "@subsocial/utils";
import type { SpaceData, PostData } from "@subsocial/api/types";
import initializeApi from "src/lib/SubsocialApi";
import type { SubsocialApi } from "@subsocial/api";

export const useSubSocialApiHook = () => {
  const [subsocialApi, setSubsocialApi] = useState<SubsocialApi | null>(null);
  const [spaces, setSpaces] = useState<SpaceData[] | null>(null);
  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);

  useEffect(() => {
    if (subsocialApi) {
      getAllPublicSpaces();
    }
  }, [subsocialApi]);

  const initApi = async (): Promise<void> => {
    try {
      const api = await initializeApi();
      setSubsocialApi(api);
    } catch (error) {
      console.warn({ error });
    }
  };

  const getAllPublicSpaces = async (): Promise<void> => {
    try {
      const myAddress = "5DSg6JpKCjKVSEEKzVtoSkszpMu3NUfWEs7WiDcCxzhXksCV";

      // Fetching ids of all the spaces by owner.
      const spaceIds = await subsocialApi?.blockchain.spaceIdsByOwner(
        myAddress
      );

      //TODO: handle undefined error
      const spaces = await subsocialApi?.findPublicSpaces(bnsToIds(spaceIds!));
      setSpaces(spaces!);
    } catch (error) {
      console.warn({ error });
    }
  };

  const getAllPosts = async (ownerAccountId: string): Promise<void> => {
    setLoading(true);

    try {
      // Fetching ids of all the spaces by owner.
      const spaceIds = await subsocialApi?.blockchain.spaceIdsByOwner(
        ownerAccountId
      );

      // Fetching space data from all ids.
      if (spaceIds) {
        const spaces = await subsocialApi?.findPublicSpaces(bnsToIds(spaceIds));
        if (spaces) {
          setSpaces(spaces);
          const postIds = await subsocialApi?.blockchain.postIdsBySpaceId(
            spaceIds[0]
          );
          const posts = await subsocialApi?.findPublicPosts(bnsToIds(postIds!));
          if (posts) {
            setPosts(posts);
          }
        }
      }
    } catch (error) {
      console.warn({ error });
    } finally {
      setLoading(false);
    }
  };

  const getAllPostsBySpaceId = async (spaceId: string): Promise<void> => {
    setLoading(true);

    try {
      const postIds = await subsocialApi?.blockchain.postIdsBySpaceId(spaceId);
      const posts = await subsocialApi?.findPublicPosts(bnsToIds(postIds!));
      if (posts) {
        setPosts(posts);
      }
    } catch (error) {
      console.warn({ error });
    } finally {
      setLoading(false);
    }
  };

  return {
    subsocialApi,
    loading,
    initApi,
    spaces,
    getAllPosts,
    posts,
    getAllPostsBySpaceId,
  };
};
