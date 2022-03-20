import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 *
 * @param { string [] } episodes array of episodes URLs to look for
 * @returns [existent, notFundIds, updateEpisodes]
 */
const useSearchEpisodeByURL = (episodes = []) => {
  const episodesSaved = useSelector((state) => state.episodes.episodes) // Episodes saved in the state of Redux
  const [existent, setExistent] = useState([]) // Existing Episodes in Redux
  const [notFundIds, setIds] = useState([]) // IDS of the non-existent episodion
  const [episodesToSearch, setEpisodes] = useState(episodes)

  /**
     * Upgrade the Episodes Array to search
     * @param { string[] } newEpisodes New URLs of the episodes
     */
  const updateEpisodes = (newEpisodes) => {
    setEpisodes(newEpisodes)
  }

  useEffect(() => {
    const ids = episodesToSearch.map((character) => character.split('/').pop())// Get the IDs of the episodes from the URLs provided

    // Filter the episodes saved in the state of Redux, based on the ID and ID of the episodes to search
    const existentChrt = episodesSaved.filter((char) => {
      const existent = ids.some((id, i) => {
        // If the episode exists it returns and deletes the ID of the IDS array
        if (Number(id) === char.id) {
          ids.splice(i, 1)
          return true
        } else {
          return false
        }
      })

      if (existent) {
        return true
      } else {
        return false
      }
    })

    setExistent(existentChrt)
    setIds(ids)
  }, [episodesSaved, episodesToSearch])

  return [existent, notFundIds, updateEpisodes]
}

export default useSearchEpisodeByURL
