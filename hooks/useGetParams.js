import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useGetParams = () => {
  const [routerObj, setRouterObj] = useState();

  const router = useRouter();

  useEffect(() => {
    console.log("in use get params", router);
    setRouterObj(router);
  }, [router.query]);

  const getParams = (name) => {
    return routerObj?.query[name];
  };

  const getUrl = () => {
    return routerObj?.asPath;
  };

  return { getParams, getUrl };
};

export default useGetParams;
