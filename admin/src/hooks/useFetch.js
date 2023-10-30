import axios from "axios";

const { useState, useEffect } = require("react");

const useFetch = (url) => {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);

        setdata(res.data);
      } catch (error) {
        seterror(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setdata(res.data);
    } catch (error) {
      seterror(error);
    }
    setLoading(false);
  };
  return { data, Loading, error, refetch };
};

export default useFetch;
