import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getLoggedIn } from "../store/users";

interface IProtectedRoute {
  component?: Function,
  children?: any,
  path?: string
}

const PrivateRoute = ({ component: Component, children, ...rest }: IProtectedRoute): JSX.Element => {
  const isLoggedIn = useSelector(getLoggedIn());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect to={{
                pathname: '/authorization',
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
}

export default PrivateRoute;
