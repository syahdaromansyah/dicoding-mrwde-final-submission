import axios from 'axios';
import { getAccessToken } from '../network-data/network-data.ts';

const swrFetcher = (url: string) => axios.get(url).then((res) => res.data);

const swrFetcherWithToken = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => res.data);

export { swrFetcher, swrFetcherWithToken };
