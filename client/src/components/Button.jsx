import React from "react";

// import classNames from "classnames";

export default function Button(props) {
  // const { confirm, danger } = props;
  // let buttonClass = classNames("button", {
  //   "button--confirm": confirm,
  //   "button--danger": danger,
  // });
  // disabled={props.disabled}
  // className={buttonClass}

  return <button onClick={props.onClick}>{props.children}</button>;
}
