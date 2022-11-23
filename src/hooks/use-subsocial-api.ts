import { useState, useEffect } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { bnsToIds } from "@subsocial/utils";
import type { SpaceData, PostData } from "@subsocial/api/types";
import { IpfsContent, SpaceUpdate } from "@subsocial/api/substrate/wrappers";
import initializeApi from "src/lib/SubsocialApi";
import type { SubsocialApi } from "@subsocial/api";
import { useWalletStore } from "src/store";

type UpdatedSpaceContent = {
  spaceId: string;
  name: string;
  about: string;
  tags: string[];
};

export const useSubSocialApiHook = () => {
  const { account } = useWalletStore((state) => ({
    account: state.account,
  }));

  const [subsocialApi, setSubsocialApi] = useState<SubsocialApi | null>(null);
  const [publicSpaces, setPublicSpaces] = useState<SpaceData[] | null>(null);
  const [profileSpace, setProfileSpace] = useState<SpaceData | null>(null);
  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [loadingUpdateSpace, setLoadingUpdateSpace] = useState(false);
  const [processMessage, setProcessMessage] = useState("Processing");

  useEffect(() => {
    if (account) {
      getAllPublicSpaces();
    }

    if (!account) {
      setProcessMessage("Connect your wallet first!");
      setTimeout(() => {
        setProcessMessage("");
      }, 3000);
    }
  }, [account]);

  const initApi = async (): Promise<void> => {
    try {
      const api = await initializeApi();
      setSubsocialApi(api);
    } catch (error) {
      console.warn({ error });
    }
  };

  const getAllPublicSpaces = async () => {
    setLoadingSpaces(true);

    try {
      if (!account) {
        setProcessMessage("Connect your wallet first!");
        setTimeout(() => {
          setProcessMessage("");
        }, 3000);
        return;
      }

      setProcessMessage("Fetching public spaces");

      const subsocialApi = await initializeApi();

      const spaceIds = await subsocialApi?.blockchain.spaceIdsByOwner(
        account.address
      );

      //TODO: handle undefined error
      const spaces = await subsocialApi?.findPublicSpaces(bnsToIds(spaceIds!));
      setPublicSpaces(spaces!);
    } catch (error) {
      console.warn({ error });
    } finally {
      setLoadingSpaces(false);
      setProcessMessage("");
    }
  };

  const getProfileSpace = async (): Promise<void> => {
    setLoading(true);

    try {
      if (!account) {
        setProcessMessage("Connect your wallet first!");
        setTimeout(() => {
          setProcessMessage("");
        }, 3000);
        return;
      }

      const profileSpace = await subsocialApi?.base.findProfileSpace(
        account.address
      );
      console.log({ profileSpace });
    } catch (error) {
      console.warn({ error });
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async (): Promise<void> => {
    setLoading(true);

    try {
      if (!account) {
        setProcessMessage("Connect your wallet first!");
        setTimeout(() => {
          setProcessMessage("");
        }, 3000);
        return;
      }

      const spaceIds = await subsocialApi?.blockchain.spaceIdsByOwner(
        account.address
      );

      // Fetching space data from all ids.
      if (spaceIds) {
        const spaces = await subsocialApi?.findPublicSpaces(bnsToIds(spaceIds));
        if (spaces) {
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

  const updateSpace = async ({
    spaceId,
    about,
    name,
    tags,
  }: UpdatedSpaceContent) => {
    setLoadingUpdateSpace(true);
    setProcessMessage("Updating space");

    try {
      const subsocialApi = await initializeApi();

      const { web3FromSource } = await import("@polkadot/extension-dapp");

      if (!account) throw new Error("Connect your wallet first");

      const injector = await web3FromSource(account.meta.source);

      if (subsocialApi) {
        const cid = await subsocialApi.ipfs.saveContent({
          about,
          name,
          tags,
        });

        //@ts-ignore
        const update = new SpaceUpdate({
          //@ts-ignore
          content: IpfsContent(cid),
          //@ts-ignore hidden: new OptionBool(false),
        });

        const substrateApi = await subsocialApi.blockchain.api;

        if (substrateApi) {
          const tx = substrateApi.tx.spaces.updateSpace(spaceId, update);

          tx.signAndSend(
            account.address,
            {
              signer: injector.signer,
            },
            async (result) => {
              const { status } = result;
              console.log({ status, result });

              if (!result || !status) {
                setLoadingUpdateSpace(false);
                return;
              }

              if (status.isFinalized || status.isInBlock) {
                const blockHash = status.isFinalized
                  ? status.asFinalized
                  : status.asInBlock;

                console.log(
                  `✅ updateSpaceTx finalized. Block hash: ${blockHash.toString()}`
                );
                setLoadingUpdateSpace(false);
              } else if (result.isError) {
                console.log(JSON.stringify(result));
                setLoadingUpdateSpace(false);
              } else {
                console.log(`⏱ Current tx status: ${status.type}`);
              }
            }
          );
        }
      }
    } catch (error) {
      console.warn({ error });
      setLoadingUpdateSpace(false);
    }
  };

  return {
    subsocialApi,
    loading,
    initApi,
    publicSpaces,
    loadingSpaces,
    getAllPublicSpaces,
    getAllPosts,
    posts,
    getAllPostsBySpaceId,
    updateSpace,
    loadingUpdateSpace,
    processMessage,
  };
};
