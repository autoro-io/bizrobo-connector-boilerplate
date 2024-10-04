// import fetch from 'node-fetch';
import syncFetch from 'sync-fetch';

type ConnectorOutput = {
  json: string;
  html: string;
}

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
function getAddress(zip: string): ConnectorOutput {
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`;
  const response = syncFetch(url);
  const json = response.json() as ZipResponse;
  return {
    json: JSON.stringify(json),
    html: "<html><body><h1>Some HTML Output</h1></body></html>",
  };
}

// Replace the defined functions with objects.

const zip = {
  getAddress
};

// export it.
export = zip;