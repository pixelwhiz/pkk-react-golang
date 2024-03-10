import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import {SideBar} from "./components/SideBar";
import {TopBar} from "./components/TopBar";
import Home from "./pages/Home";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import Login from "./pages/admin/Login";
import NotFoundPages from "./pages/NotFound";
import Tugas01 from "./pages/Tugas01";
import Tugas01Create from "./pages/Tugas01Create";
import Tugas01Modify from "./pages/Tugas01Modify";
import Tugas01Delete from "./pages/Tugas01Delete";

export const App = () => (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Navigate to={"/home"}/>}/>
              <Route path={"/home"} element={<Home />} />
              <Route path={"/daftarsiswa"} element={<Tugas01 />} />
              <Route path={"/daftarsiswa/create"} element={<Tugas01Create />} />
              <Route path={"/daftarsiswa/:nis/modify"} element={<Tugas01Modify />} />
              <Route path={"/daftarsiswa/:nis/delete"} element={<Tugas01Delete />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/*"} element={<NotFoundPages />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
)
