import type { PostData } from "@subsocial/types";

type PostCardProps = {
  post: PostData;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div
      id="post-card"
      className="card card-compact w-96 bg-base-100 shadow-xl"
    >
      <figure>
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
