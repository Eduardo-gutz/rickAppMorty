import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSearchCharactersByURL = (characters = []) => {
    const charactersSaved = useSelector((state) => state.characters.characters);
    const [existent, setExistent] = useState([]);
    const [notFundIds, setIds] = useState([]);
    const [charactersToSearch, setCharacters] = useState(characters)

    useEffect(() => {
        const ids = charactersToSearch.map((character) => character.split('/').pop());
        
        const existentChrt = charactersSaved.filter((char) => {
            const existent = ids.some((id, i) => {
                if (Number(id) === char.id) {
                    ids.splice(i, 1);
                    return true
                } else {
                    return false
                }
            });
    
            if (existent) {
                return true;
            }
        });

        setExistent(existentChrt);
        setIds(ids);
    }, [charactersToSearch]);

    return [existent, notFundIds, setCharacters]
};

export default useSearchCharactersByURL;