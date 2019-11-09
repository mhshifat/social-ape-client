import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (path, payload = null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios[payload ? "post" : "get"](path, payload);
        setLoading(false);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, [path, payload]);

  return { loading, data };
};

export const useForm = formValues => {
  const [state, setState] = useState(formValues);

  return {
    state,
    handleFormInputChange: e =>
      setState({ ...state, [e.target.name]: e.target.value })
  };
};
