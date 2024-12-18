import { HashRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/auth/authOperations";
import { RestrictedRoute } from "./Routes/restrictedRoute";
import { PrivateRoute } from "./Routes/privateRoute";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const LazyHomePage = lazy(() => import("./pages/Home/Home"));
const LazyRegister = lazy(() => import("./pages/RegisterForm/RegisterForm"));
const LazyLogin = lazy(() => import("./pages/LoginForm/LoginForm"));
const LazyNotFound = lazy(() => import("./pages/NotFound/NotFound"));
const LazyUserDiary = lazy(() => import("./pages/DiaryPage/Diary"));
const LazyUserCalc = lazy(() => import("./pages/CalculatorPage/Calculator"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/diary"
                  component={<LazyHomePage />}
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  redirectTo="/diary"
                  component={<LazyLogin />}
                />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  redirectTo="/login"
                  component={<LazyRegister />}
                />
              }
            />
            <Route
              path="diary"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<LazyUserDiary />}
                />
              }
            />
            <Route
              path="calculator"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<LazyUserCalc />}
                />
              }
            />
            <Route path="*" element={<LazyNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
