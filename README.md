# BOS + OpenSea

This repository is an example of how to implement an API to get the NFTs of famous collections in other protocols, in this case that of Bored Apes in OpenSea.

![NFTs](https://drive.google.com/uc?id=1Cdk6nVJicpt6C0iRauQKlIggNLCz4L2q)

## How to get OpenSea NFTs information in BOS?

In order to query information from famous collections in OpenSea we will make use of alchemy, an API to query information from other networks, for example Ethereum.

The following link provides information on the methods available in the API for querying information: https://docs.alchemy.com/reference/getnftsforcontract-v3

![alchemy](https://drive.google.com/uc?id=1g9Jd7vaP8eSP4pObP_HQeckgr4i2zmLK)

To get information from an API we only have to make a call from BOS using asyncFetch to the corresponding URL.

Example:
```jsx
  asyncFetch(
    "https://eth-mainnet.g.alchemy.com/nft/v3/" +
      state.api_key +
      "/getNFTsForContract?contractAddress=" +
      state.contract +
      "&withMetadata=true",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }
  )
    .then(({ body }) => {
      if (body) {
        State.update({
          allNFTS: body.nfts,
          init: true,
        });
      } else {
        State.update({
          allNFTS: null,
          init: true,
        });
      }
    })
    .catch((err) => console.log(err));
```

BOS Widget: https://near.org/owa-is-bos.near/widget/BOS-OpenSea
