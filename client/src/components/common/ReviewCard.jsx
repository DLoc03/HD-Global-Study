import React from "react";

function ReviewCard({ user, avatar }) {
  return (
    <div className="shadow-main flex max-h-[320px] min-h-[280px] w-full max-w-[360px] flex-col gap-2 rounded-xl p-4">
      <div className="flex gap-4">
        <img
          src={avatar}
          alt={user.name}
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
          className="rounded-full"
        />
        <div className="flex max-w-[220px] flex-col gap-1">
          <h1 className="line-clamp-2 text-lg font-medium">{user.name}</h1>
          <hr className="border-1 border-t border-gray-200" />
          <h1 className="text-md line-clamp-2 min-h-12">{user.position}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-md line-clamp-2 font-medium">
          {user.review_title}
        </h1>
        <h1 className="text-sm">{user.review_text}</h1>
      </div>
    </div>
  );
}

export default ReviewCard;
