import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "./services/UserContext";
import RequireAuth from "./layout/RequireAuth";

import BaseLayout from "./layout/BaseLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import EntityListPage from "./pages/EntityListPage";
import EntityDetailsPage from "./pages/EntityDetailsPage";
import EntityCreatePage from "./pages/EntityCreatePage";

export default function Routing() {

  const auth = (el) => {
    return <RequireAuth> {el} </RequireAuth> 
  }

  return (
    <BrowserRouter>
        <Routes>
          
          <Route element={<BaseLayout />} >
            <Route path="/login" element={<Login />} />
            <Route path="/" element={ <Navigate to="/admin" /> }/>
            <Route path="/admin" element={ auth(<Home/>)}/>

            <Route path="admin/:entity" element={auth(<EntityListPage />)} />
            <Route path="admin/:entity/:id" element={auth(<EntityDetailsPage/>)} />
            <Route path="admin/:entity/create" element={auth(<EntityCreatePage />)} />

          </Route>

        </Routes>
    </BrowserRouter>
  );
}
