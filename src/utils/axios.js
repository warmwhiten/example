import axios from 'axios';

const axiosWrap = async ({
  method,
  url,
  params,
  body,
}) => {
  try {
    const { data } =
      (method === 'get' && (await axios.get(url, params))) ||
      (method === 'post' && (await axios.post(url, body, params))) ||
      (method === 'patch' && (await axios.patch(url, body, params))) ||
      (method === 'delete' && (await axios.delete(url, params))) ||
      {};
    return data;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const GET = (url, params) => axiosWrap({ method: 'get', url, params });
export const POST = (url, body, params) => axiosWrap({ method: 'post', url, params, body });
export const PATCH = (url, body, params) => axiosWrap({ method: 'patch', url, params, body });
export const DELETE = (url, params) => axiosWrap({ method: 'delete', url, params });