import type { PostData } from "@subsocial/api/types";
import { useCardStyleStore } from "src/store";

type PostCardProps = {
  post: PostData;
};

const PostCard = ({ post }: PostCardProps) => {
  const { borderStyle, placementStyle, paddingStyle } = useCardStyleStore(
    (state) => ({
      borderStyle: state.borderStyle,
      placementStyle: state.placementStyle,
      paddingStyle: state.paddingStyle,
    })
  );

  console.log({ borderStyle, placementStyle, paddingStyle });

  const rootClasses = `${borderStyle} ${placementStyle} w-96 bg-base-100 shadow-xl`;
  const figureClasses = `${paddingStyle}`;

  return (
    <div id="post-card" className={rootClasses}>
      <figure className={figureClasses}>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.content?.title}</h2>
        <p>{post.content?.body}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Upvote</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
