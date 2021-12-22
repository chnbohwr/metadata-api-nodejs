import nameList from './name.json';
const HOST = 'https://hyman-nft.herokuapp.com'
export default function handler(req, res) {
  const { tokenId } = req.query
  const name = nameList[tokenId];
  const data = {
    name,
    attributes: {
      creator: 'hyman',
      karma: tokenId,
    },
    'image': `${HOST}/images/collection_${tokenId}.png`
  }
  res.send(data);
}