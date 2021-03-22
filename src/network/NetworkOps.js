import {create} from 'apisauce';

class NetworkOps {
  get = async (url) => {
    const api = create({
      baseUrl: 'https://itunes.apple.com',
      timeout: 30000,
    });
    const res = await api.get(`https://itunes.apple.com${url}`);
    if (res.status == 200) {
      return {data: res.data, status: res.status};
    }
    return {status: res.status};
  };
}

export default new NetworkOps();
