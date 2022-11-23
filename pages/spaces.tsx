import Head from "next/head";
import Layout from "src/components/Layout";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import type { SpaceData } from "@subsocial/api/types";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";
import EditSpaceModal from "src/components/EditSpaceModal";

const Customize = () => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const { initApi, publicSpaces, loadingSpaces, processMessage } =
    useSubSocialApiHook();

  useEffect(() => {
    initApi();
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [editedSpaceId, setEditedSpaceId] = useState("0");

  return (
    <div>
      <Head>
        <title>My Web3 Space - My Spaces</title>
        <meta name="description" content="My space in web3 - My Spaces" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col gap-8">
          <div className="text-xl font-semibold">
            Here is your public spaces
          </div>
          {publicSpaces &&
            publicSpaces.map((space) => (
              <div
                key={space.id}
                className="card card-side w-[720px] bg-base-100 shadow-xl"
              >
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {space.content?.name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{space.content?.about}</p>
                  <div className="card-actions justify-end">
                    {space.content?.tags &&
                      space.content?.tags.map((tag, i) => (
                        <div
                          key={`${tag}-${i}`}
                          className="badge badge-outline"
                        >
                          {tag}
                        </div>
                      ))}
                  </div>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => {
                        setEditedSpaceId(space.id);
                        setOpen(!isOpen);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <EditSpaceModal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          editedSpace={
            (publicSpaces &&
              publicSpaces.find(
                (space: SpaceData) => space.id === editedSpaceId
              )) ??
            null
          }
        />

        {loadingSpaces ? (
          <div className="toast toast-center">
            <div className="alert alert-info min-w-max">
              <div>
                <span>{processMessage}</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
};

export default Customize;
