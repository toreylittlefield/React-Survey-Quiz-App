import { useEffect, useState } from 'react';

const useFetch = () => {
  const url =
    'https://gist.githubusercontent.com/ttoomey/c8b14270e076165a97ff0f4e3ee251d3/raw/764f2b94c8714ed34f2c9c4d40c433a3fdca8c60/questions.json';
  useEffect(() => {
    const wrapper = async () => {
      const data = await fetch(url, { method: 'GET' });
      if (data.status !== 200) {
        setStatus({ loading: false, error: true });
        return;
      }
      const dataApi = await data.json();
      setData(dataApi);
      setStatus({ loading: false, error: false });
    };
    wrapper();
  }, []);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });

  if (status.loading || status.error) {
    return [status, setStatus];
  }
  return [data, setData];
};

export default useFetch;