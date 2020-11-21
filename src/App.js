import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import LanguageContext from "./contexts/languageContext";

import LanguagePicker from "./LanguagePicker";

import Input from "./Input";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type : ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: "",
    language: "en",
  });
  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className={"container"} data-test={"spinner"}>
        <div className={"spinner-border"} role={"status"}>
          <span className={"sr-only"}>Loading ...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className={"container"} data-test={"component-app"}>
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </LanguageContext.Provider>
    </div>
  );
};

export default App;
