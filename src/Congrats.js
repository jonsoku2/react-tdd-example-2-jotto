import React from "react";
import PropTypes from "prop-types";

import LanguageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Congrats = (props) => {
  const language = React.useContext(LanguageContext);

  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
