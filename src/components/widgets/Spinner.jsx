import { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function Spinner() {
  let [loading] = useState(true);
  let [color] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
