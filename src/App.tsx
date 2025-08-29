import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import LaunchingPage from "./LaunchingPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <LaunchingPage />
    </BrowserRouter>
  );
}

export default App;
