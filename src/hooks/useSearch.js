import { useQuery } from 'react-query'
import { keysToCamel } from '../utils/keysToCamel'
import search from '../utils/search'

export const getSearchQueryKey = (keyword) => ['search', keyword]

export default function useSearch(keyword) {
  return useQuery(
    getSearchQueryKey(keyword),
    () => search(keyword).then(keysToCamel),
    {
      enabled: !!keyword,
      retry: 0,
    }
  )
}
