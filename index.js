require('dotenv').config();

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SEC);

const axios = require('axios');

const remove = async() => {
  var ret = await pinata.pinList({status : 'pinned'});

  for (var x in ret.rows) {
    console.log(ret.rows[x])
    console.log("=================")
    try {
      const url = `https://api.pinata.cloud/pinning/unpin/${ret.rows[x].ipfs_pin_hash}`;
      var res = await axios
                        .delete(url, {
                          headers: {
                            pinata_api_key: process.env.API_KEY,
                            pinata_secret_api_key: process.env.API_SEC
                          }
                        });
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }

  // console.log(ret.count);

  // pinata.userPinnedDataTotal().then((result) => {
  //   //handle results here
  //   console.log(result);
  // }).catch((err) => {
  //   //handle error here
  //   console.log(err);
  // });
}

remove();