import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faX } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
function ExplainerBox({ info }) {
  const [closed, setClosed] = useState(true);
  return (
    <div className="explainer-box">
      <p className={closed ? "display-none" : ""}>{info}</p>
      <FontAwesomeIcon
        icon={closed ? faCircleInfo : faX}
        className={closed ? "icon green" : "icon red"}
        size="xs"
        onClick={() => setClosed((prevClosed) => !prevClosed)}
      />
    </div>
  );
}

export default ExplainerBox;
