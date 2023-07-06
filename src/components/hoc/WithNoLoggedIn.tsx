import NonLoggedInMessage from "../common/NonLoggedInMessage";

interface WithNoLoggedIn {
    isLoggedIn: boolean;
    children: React.ReactElement | React.ReactElement[];
  }
  
  const WithNoLoggedIn: React.FunctionComponent<WithNoLoggedIn> = ({ isLoggedIn, children }) => {
    return isLoggedIn ? <>{children}</> : <><NonLoggedInMessage /></>
  };

export default WithNoLoggedIn