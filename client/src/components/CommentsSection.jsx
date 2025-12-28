import Comment from "./Comment";
import { IoIosSend } from "react-icons/io";

const CommentsSection = ({ comments }) => {
  const fakeComments = Array(Math.floor(Math.random() * 10) + 1)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      comment: `This is a fake comment ${i + 1}`,
    }));
  return (
    <div
      className={`my-10 flex flex-col gap-1 
          md:w-2/3 md:mx-auto
          lg:w-1/2
        `}
    >
      <h2 className="text-2xl font-semibold">Comments</h2>
      <form action="" className="flex items-center gap-2 my-4">
        <input
          type="text"
          name="comment"
          placeholder="Write a comment..."
          className="border-neutral-200 border px-4 py-2 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-700 p-2  rounded-full"
        >
          <IoIosSend className="text-2xl text-white" />
        </button>
      </form>
      {fakeComments.map(({ id, comment }) => (
        <Comment key={id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
