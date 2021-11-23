import { useState } from 'react';
import Cards from '../components/Cards';
import InputBox from '../components/InputBox';
import { IPasswordCardItems } from '../interfaces';
import '../SASS/base/_Home.scss';

const Home = () => {
  const [passwordCards, setPasswordCards] = useState<IPasswordCardItems[]>([]);

  return (
    <div className="Home">
      <div className="Home-container">
        <h1 className="Home-container_title">Password Generator</h1>
        <InputBox passwordCards={passwordCards} setPasswordCards={setPasswordCards} />
        <Cards passwordCards={passwordCards} setPasswordCards={setPasswordCards} />
      </div>
    </div>
  );
};

export default Home;
