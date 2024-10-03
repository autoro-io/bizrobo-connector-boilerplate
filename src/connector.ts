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

// Please make sure to set the function definitions at the top level.
// generate-manifest searches for function definitions.
// Also, please specify the types each time. They may be reflected in the manifest.
// The return value may need to be in JSON format...
async function getAddress(zip: string): Promise<ZipResponse> {
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`;
  const response = await fetch(url);
  const json = await response.json() as ZipResponse;
  return json;
}

// Replace the defined functions with objects.

const zip = {
  getAddress
};

// export it.
export = zip;