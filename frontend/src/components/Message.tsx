import React from "react";
import classNames from "classnames";

interface MessageProps {
  sender: "user" | "bot";
  text: string;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
  return (
    <div className={classNames("message", sender)}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
