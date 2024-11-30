import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../redux/auth/selectorsAuth";

export const useAuth = () => {
  const IsAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return { IsAuthenticated, user };
};
