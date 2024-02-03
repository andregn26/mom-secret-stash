import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { PageRegister } from "./Pages/PageRegister";
import { PageLogin } from "@/Pages/PageLogin";
import { PageMain } from "./Pages/PageMain";
import { PageProfile } from "./Pages/PageProfile";
import { TemplateNavigation } from "./Templates/TemplateNavigation";
import { PageCreateRecipe } from "./Pages/PageCreateRecipe";
function App() {
  return (
    <div className="relative bg-base-100 w-full h-screen overflow-hidden lg:flex ">
      <TemplateNavigation>
        <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
          <Routes>
            <Route index element={<PageMain />} />
            <Route path={"login"} element={<PageLogin />} />
            <Route path={"register"} element={<PageRegister />} />
            <Route path={"profile"} element={<PageProfile />} />
            <Route path={"recipes"}>
              <Route path="create" element={<PageCreateRecipe />} />
            </Route>
          </Routes>
        </main>

      </TemplateNavigation>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
