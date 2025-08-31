import React from "react";

function ServiceCard({ service, avatar }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={avatar}
        alt={service.name}
        style={{ width: "80px", height: "80px" }}
      />
      <h1 className="text-primary max-w-[172px] text-center font-medium">
        {service.title}
      </h1>
    </div>
  );
}

export default ServiceCard;
