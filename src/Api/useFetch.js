import { useEffect, useState } from 'react';

const useFetch = () => {
  const url = `https://gist.githubusercontent.com/toreylittlefield/9a267a75aa8193abd339c20191a137ad/raw/0dc30b0b13ec5bac8c523a88808bfa306f1c74d9/gistfile1.json`;
  // const url =
  //   'https://gist.githubusercontent.com/ttoomey/c8b14270e076165a97ff0f4e3ee251d3/raw/764f2b94c8714ed34f2c9c4d40c433a3fdca8c60/questions.json';
  useEffect(() => {
    const wrapper = async () => {
      try {
        const data = await fetch(url, { method: 'GET' });
        if (data.status !== 200) {
          setStatus({
            loading: false,
            errors: { isError: true, errorMessage: data.statusText.toString() },
          });
          return;
        }
        setTimeout(async () => {
          const dataApi = await data.json();
          setData(dataApi);
          setStatus({ loading: false, errors: false });
        }, 3000);
      } catch (error) {
        setStatus({
          loading: false,
          errors: { isError: true, errorMessage: error.message.toString() },
        });
        return;
      }
    };
    wrapper();
  }, [url]);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    loading: true,
    errors: {
      isError: false,
      errorMessage: '',
    },
  });

  return [data, status.loading, status.errors, setData];
};

export default useFetch;
