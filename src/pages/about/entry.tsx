import { createRoot } from "react-dom/client";
import { AboutPage } from "./about-page";

const root = document.getElementById("root");
if (!root) throw new Error("The page is missing its React root element.");
createRoot(root).render(<AboutPage />);
