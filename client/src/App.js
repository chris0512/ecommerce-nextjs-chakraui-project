import { ChakraBaseProvider} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    <ChakraBaseProvider>
      <Router>
        <Navbar />
      </Router>
    </ChakraBaseProvider>
  );
}

export default App;
