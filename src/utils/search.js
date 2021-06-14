import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_APPLICATION_KEY
)
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME)

export const algoliasearchEndpoints = index.transporter.hosts.map(
  ({ protocol, url }) =>
    `${protocol}://${url.toLowerCase()}/1/indexes/${
      process.env.REACT_APP_ALGOLIA_INDEX_NAME
    }/query`
)

export default function search(keyword) {
  return index.search(keyword)
}
