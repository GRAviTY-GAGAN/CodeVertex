import React from "react";
import { useSelector } from "react-redux";

function FeedbackCard({ feedback }) {
  const user = useSelector((store) => store.reducer.user);

  const date = feedback.date.split(" ").splice(0, 5).join(" ");

  // console.log(date, "DATE");
  return (
    <div className="card">
      {/* <div>
        <p className="text-">{date}</p>
      </div> */}
      <div className="card-header">
        <h3 className="score m-0  flex justify-between flex-wrap">
          <p className="w-[150px] font-medium">
            {feedback.body?.split("\n")[2]?.replace(",", "")?.toUpperCase()}/10
          </p>
          <p className=" text-gray-400 font-medium text-[15px]">{date}</p>
        </h3>
        {/* <p className="author">{user.name}</p> */}
      </div>
      <div className="card-body">
        <p className="message">
          Feedback :{" "}
          {feedback.body
            ?.split("\n")[3]
            ?.replace("feedback:", "")
            .replace(",", "")
            .replaceAll("'", "")
            .replace("extra:", "")
            .replace(",", "")
            .replaceAll("'", "")
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll(".", "")
            .replace("feedback", "")
            .replace("error", "")
            .replace(":", "")
            .replace("extra", "")}
        </p>
      </div>
    </div>
  );
}

export default FeedbackCard;
