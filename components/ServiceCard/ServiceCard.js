import React from "react";
import classnames from "classnames";
import "./service-card.scss";

export const ServiceCard = ({ icon, iconBg, title, description }) => {
  return (
    <div className={classnames({ "service-card": true, card: true, hoverable: true })}>
      <div className="icon-wrapper">
        <div className="circle">{icon}</div>
      </div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
};
