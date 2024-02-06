const CharacterCard = (props) => {
  const { chData } = props;
  return (
    <div className="ch-card">
      <img
        src={`https://rickandmortyapi.com/api/character/avatar/${chData.id}.jpeg`}
        alt=""
      />
      <ul>
        <h2>{chData.name}</h2>
        <h3>
          {chData.status}- {chData.species}
        </h3>
        <h3>Last known location: {chData.location.name}</h3>
      </ul>
    </div>
  );
};

export default CharacterCard;
