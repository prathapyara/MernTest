import {Routes,Route,BrowserRouter} from "react-router-dom"
import { UserPage } from "./pages/users.js";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/edit/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
