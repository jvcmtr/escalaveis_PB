import React, { createContext, useContext } from "react";
import api from "./RESTService.js";
import metadata from "../../ENTITY_CONFIG.json"
import config from "../../config.js";

export const RESTContext = createContext(null);

export function RESTProvider( props ){
    const [meta, setMeta] = React.useState({});

  React.useEffect(() => {
    // const fetchMetadata = async () => {
    //   try {
    //     var url = `${config.apiBaseUrl}/ENDPOINTSMETAINFO.json`
    //     const response = await fetch(url);

    //     if (!response.ok) {throw new Error(`Falha ao carregar as metainformações de url:${url}`);}
    //     const remoteMetadata = await response.json();

    //     setMeta(remoteMetadata);
    //   } catch (error) {
    //     console.error("ERRO : ", error);
    //   }
    // };
    setMeta(metadata)
    // fetchMetadata()

  }, []);

  const value = {
    metadata: meta,
    api: api,
  };

  return (
    <RESTContext.Provider value={value}>{props.children}</RESTContext.Provider>
  );
};

export const useREST = () => useContext(RESTContext);