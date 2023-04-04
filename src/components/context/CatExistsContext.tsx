import React, { createContext } from "react";

type CatExists = boolean

export const CatExistsContext: React.Context<boolean> = createContext<boolean>(false)