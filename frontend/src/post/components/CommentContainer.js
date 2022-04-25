import CommentInput from "./CommentInput";
import "./CommentContainer.css";
import CommentItem from "./CommentItem";
import { useRef } from "react";

const CommnentContainer = (props) => {
  const scrollRef = useRef();

  const scrollToEnd = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="comment-container">
        <CommentInput
          refetch={props.refetch}
          id={props.id}
          scrollEnd={scrollToEnd}
        />
        {props.comments.map((comment) => {
          console.log(comment);
          return (
            <CommentItem
              refetch={props.refetch}
              key={comment._id}
              id={comment._id}
              pid={props.id}
              profileImage={comment.author.profileImage}
              uid={comment.author.uid}
              comment={comment.comment}
            />
          );
        })}
        <div className="scroll-ref" ref={scrollRef}></div>
      </div>
    </>
  );
};
export default CommnentContainer;
