import { useState } from "react";
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

  const initApi = async (): Promise<void> => {
    try {
      const api = await initializeApi();
      setSubsocialApi(api);
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

  return {
    subsocialApi,
    loading,
    initApi,
    getAllPosts,
    posts,
  };
};
