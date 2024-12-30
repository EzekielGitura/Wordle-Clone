import { words } from "./data";
import Header from "./components/layout/Header";
import Game from "./components/Game/Game";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptWord } from "./helpers";

const getWord = () => {
  const random = Math.floor(Math.random() * words.length);
  return encryptWord(words[random]);
};

const App = () => {
  const word = getWord();

  const handleStartNewGame = () => {
    window.location.reload();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        stacked
        toastClassName={"text-sm"}
      />
      <div className="w-full h-dvh flex flex-col">
        <Header onNewGame={handleStartNewGame} />
        <Game word={word} onNewGame={handleStartNewGame} />
      </div>
    </>
  );
};

export default App;
