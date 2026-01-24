import React, { useState } from "react";
// import checkIcon from "../assets/Images/checkIcon.svg";
// import copyIcon from "../assets/Images/copyIcon.svg";

const CopyToClipboardButton = ({ className, textToCopy, styles }) => {
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState("https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80");
  const [isClickable, setIsClickable] = useState(true);

  const handleCopy = async () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setButtonText("Copied");
          setImage("https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80");
          setIsClickable(false);

          setTimeout(() => {
            setButtonText("Copy");
            setImage("https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80");
            setIsClickable(true);
          }, 3000);
        })
        .catch(() => { });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");

        setButtonText("Copied");
        setImage("https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80");
        setIsClickable(false);

        setTimeout(() => {
          setButtonText("Copy");
          setImage("https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80");
          setIsClickable(true);
        }, 3000);
      } catch (err) {
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <button
      className={
        className ||
        "input-group-text copy_button rounded-0 shadow-none border-0 p-0 "
      }
      id="basic-addon1"
      type="button"
      onClick={isClickable ? handleCopy : null}
      style={styles}
    >
      <img alt="copy" src={image} className="pe-1" />
      {buttonText}
    </button>
  );
};

export default CopyToClipboardButton;

