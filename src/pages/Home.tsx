import { useState } from 'react';
import api from '../api/api';
import Cards from '../components/Cards';
import InputBox from '../components/InputBox';
import { IPasswordCardItems } from '../interfaces';
import '../SASS/base/_Home.scss';

const Home = () => {
  const [passwordCards, setPasswordCards] = useState<IPasswordCardItems[]>([]);

  const handleDelete = async (cardId: string) => {
    try {
      await api.delete(`/generatedPasswords/${cardId}`);
      const filteredPasswordCardsAfterDelte = passwordCards.filter((card) => card.id !== cardId);
      setPasswordCards(filteredPasswordCardsAfterDelte);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/imgs/background.svg`} className="background" alt="" srcSet="" />
      <div className="Home">
        <div className="Home-container">
          <h1 className="Home-container_title">Password Generator</h1>
          <InputBox passwordCards={passwordCards} setPasswordCards={setPasswordCards} />
          <Cards
            passwordCards={passwordCards}
            setPasswordCards={setPasswordCards}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
