import React from "react";

export default function Button({ children, className, onClick }) {
  let style =
    className +
    " px-6 py-2 m-1 rounded-md bg-red-800 text-white hover:bg-red-600  ";

  return (
    <>
      <button className={style} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
