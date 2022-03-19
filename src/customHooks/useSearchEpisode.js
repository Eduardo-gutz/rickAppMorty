import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSearchEpisodeByURL = (episodes = []) => {
    const episodesSaved = useSelector((state) => state.episodes.episodes);
    const [existent, setExistent] = useState([]);
    const [notFundIds, setIds] = useState([]);
    const [episodesToSearch, setEpisodes] = useState(episodes)

    const updateEpisodes = (newEpisodes) => {
        setEpisodes(newEpisodes)
    }

    useEffect(() => {
        const ids = episodesToSearch.map((character) => character.split('/').pop());
        
        const existentChrt = episodesSaved.filter((char) => {
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
    }, [episodesToSearch]);

    return [existent, notFundIds, updateEpisodes]
};

export default useSearchEpisodeByURL;