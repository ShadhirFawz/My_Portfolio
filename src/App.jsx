import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContactForm from "./pages/ContactForm";
import TechStack from "./pages/TechStack";
import Projects from "./pages/Projects";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`;

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/tech" element={<TechStack />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
