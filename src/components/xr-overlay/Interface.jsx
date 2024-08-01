import React, { forwardRef } from "react";
import { useCharacterAnimations } from "../../contexts/CharacterAnimations";

const Interface = forwardRef((props, ref) => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();

  return (
    <div id="overlay-content" ref={ref}>
      <div className="dom-container">
        <div className="button-container">
          {animations.map((animation, index) => (
            <button
              key={animation}
              className={`button ${index === animationIndex ? "active" : ""}`}
              onClick={() => setAnimationIndex(index)}
            >
              {animation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Interface;
