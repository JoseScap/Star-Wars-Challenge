import { useEffect, useState } from 'react'

import axios from 'axios'

export default function useInfinity (query, pageNumber) {
  // STATES
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [characters, setCharacters] = useState([])
  const [hasMore, setHasMore] = useState(false)

  // Cada vez que realizamos una nueva busqueda cambiando el query reinicimas la lista de characters
  useEffect(() => {
    setCharacters([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: 'https://swapi.dev/api/people',
      params: {
        page: pageNumber,
        search: query
      },
      cancelToken: new axios.CancelToken(e => { const cancel = e; return cancel })
    })
      .then(res => {
        setCharacters(prevCh => {
          return [...new Set([...prevCh, ...res.data.results])]
        })
        setHasMore(!!res.data.next)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return null
        }
        setError(true)
      })
  }, [query, pageNumber])

  return { loading, error, characters, hasMore }
}
