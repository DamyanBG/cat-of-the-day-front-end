import React from "react";
import loaderGif from "../../assets/gifs/loader_blue.gif";

interface WithLoadingProps {
  isLoading: boolean;
  children: React.ReactElement | React.ReactElement[];
}

const WithLoading: React.FunctionComponent<WithLoadingProps> = ({ isLoading, children }) => {
  return isLoading ? <img src={loaderGif} alt="Loader gif" /> : <>{children}</>;
};

export default WithLoading;
