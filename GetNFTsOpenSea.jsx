State.init({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  api_key: "c19f1YSp1FKWlhQHi4gAx0DbxkFM2r48",
  allNFTS: null,
  init: false,
});

const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

const getNFTsForContract = () => {
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
        console.log("1");
        State.update({
          allNFTS: body.nfts,
          init: true,
        });
      } else {
        console.log("2");
        State.update({
          allNFTS: null,
          init: true,
        });
      }
    })
    .catch((err) => console.log(err));
};

return (
  <div>
    <h1>BOS + OpenSea</h1>
    <div>
      <input
        placeholder="Contract Address"
        value={state.contract}
        onChange={(e) => State.update({ contract: e.target.value })}
        style={{ width: "420px" }}
      />
      <button
        style={{ marginTop: "10px" }}
        onClick={async () => {
          getNFTsForContract();
        }}
      >
        Search Collection
      </button>
      <br />
    </div>
    {state.allNFTS ? (
      <>
        <label style={{ fontWeight: "bold" }}>
          Collection Name: {state.allNFTS[0].collection.name}
        </label>
        <div
          style={{
            marginTop: "10px",
            display: "grid",
            "grid-template-columns": "repeat(4, 1fr)",
            "grid-column-gap": "10px",
            "grid-row-gap": "10px",
          }}
        >
          {state.allNFTS &&
            state.allNFTS.map(
              (nft, i) =>
                nft.image &&
                nft.image.pngUrl && (
                  <div>
                    <img
                      src={
                        nft.image.pngUrl !== null
                          ? nft.image.pngUrl
                          : loadingUrl
                      }
                      style={{ width: "150px", height: "150px" }}
                    />
                    <br />
                    <label>Token Id: {nft.tokenId}</label>
                    <br />
                    <a
                      href={
                        "https://opensea.io/assets/ethereum/" +
                        state.contract +
                        "/" +
                        nft.tokenId
                      }
                      target="_blank"
                    >
                      Open NFT
                    </a>
                  </div>
                )
            )}
        </div>
      </>
    ) : (
      state.init && (
        <label style={{ fontWeight: "bold" }}>Collection Not Found</label>
      )
    )}
  </div>
);
