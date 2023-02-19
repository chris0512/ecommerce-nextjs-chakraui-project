import { ChakraBaseProvider} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import Footer from './components/Footer';
import LandingScreen from "./screens/LandingScreen";


function App() {
  return (
    <ChakraBaseProvider>
      <Router>
        <Navbar />
          <main>
              <Routes>
                  <Route path="/" element={<LandingScreen/>}></Route>
                  <Route path="/products" element={<ProductsScreen/>}></Route>
                  <Route path="/product/:id" element={<ProductScreen></ProductScreen>}></Route>
                  <Route path="/cart" element={<CartScreen/>}></Route>
              </Routes>

          </main>
          <Footer></Footer>
      </Router>
    </ChakraBaseProvider>
  );
}

export default App;
