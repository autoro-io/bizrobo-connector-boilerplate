import fetch from 'node-fetch';

type ZipResponse = {
  message: null | string;
  results: {
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
    prefcode: string;
    zipcode: string;
  }[];
  status: number;
}

async function getAddress(zip: string): Promise<ZipResponse> {
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`;
  const response = await fetch(url);
  const json = await response.json() as ZipResponse;
  return json;
}

const zip = {
  getAddress
};

export = zip;