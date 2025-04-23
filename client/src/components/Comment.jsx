const Comment = ({ comment }) => {
  return (
    <div className="border-neutral-200 border p-4 rounded-md">
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
