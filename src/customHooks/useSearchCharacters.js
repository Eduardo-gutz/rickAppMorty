import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Hook to find characters in the state of Redux based on URLs provided by the Endpoint
 * @param { string[] } characters Search URLs Arrangement Search
 * @returns [existent, notFundIds, setCharacters]
 */
const useSearchCharactersByURL = (characters = []) => {
  const charactersSaved = useSelector((state) => state.characters.characters) // Saved characters in the state of Redux
  const [existent, setExistent] = useState([]) // Characters that exist in the state of Redux
  const [notFundIds, setIds] = useState([]) // IDS of characters that do not exist in the state of Redux
  const [charactersToSearch, setCharacters] = useState(characters) // URLs of the characters that should be searched

  useEffect(() => {
    const ids = charactersToSearch.map((character) => character.split('/').pop()) // Get the IDs of the characters from the URLs provided

    // Filter the characters saved in the state of Redux, based on the ID and ID of the characters to search
    const existentChrt = charactersSaved.filter((char) => {
      const existent = ids.some((id, i) => {
        // If the character exists it returns and deletes the ID of the IDS array
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
  }, [charactersSaved, charactersToSearch])

  return [existent, notFundIds, setCharacters]
}

export default useSearchCharactersByURL
