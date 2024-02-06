import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CharacterInfo = () => {
  const { chId } = useParams();
  const [characterInfo, setCharacterInfo] = useState(null);
  const [episode, setEpisode] = useState("");

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchEpisode = async () => {
    const episodeData = await fetch(characterInfo[chId - 1].episode[0]);
    const jsonData = await episodeData.json();
    setEpisode(jsonData.name);
  };

  const fetchInfo = async () => {
    const data = await fetch("https://rickandmortyapi.com/api/character");
    const json = await data.json();
    setCharacterInfo(json?.results);
  };

  useEffect(() => {
    if (characterInfo) fetchEpisode();
  }, [characterInfo]);

  if (characterInfo === null) return <div>Oops!!!</div>;

  return (
    <div className="character-info">
      <img
        src={`https://rickandmortyapi.com/api/character/avatar/${chId}.jpeg`}
        alt=""
      />
      <div className="ch-info">
        <ul>
          <h2>{characterInfo[chId - 1].name}</h2>

          <h2>
            {characterInfo[chId - 1].species}-{characterInfo[chId - 1].status}
          </h2>
          <h2>Origin - {characterInfo[chId - 1].origin.name}</h2>
          <h2>Last Known location - {characterInfo[chId - 1].location.name}</h2>
          <h2> Episode - {episode}</h2>
        </ul>
      </div>
    </div>
  );
};

export default CharacterInfo;
