import '../SASS/base/_InputBox.scss';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import api from '../api/api';
import { IPasswordCardItems } from '../interfaces';

interface IInputBoxProps {
    passwordCards: IPasswordCardItems[],
    setPasswordCards: (allCards: any[]) => void,
}

const InputBox = ({ passwordCards, setPasswordCards }: IInputBoxProps) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [sliderLength, setSliderLength] = useState<number>(5);
  const [randomPassword, setRandomPassword] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const id = uuidv4();
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPasswordCard = {
      id, title: nameInput, dateTime, password: randomPassword,
    };

    try {
      const response = await api.post('/generatedPasswords', newPasswordCard);
      console.log(response.data);
      console.log([...passwordCards, response.data]);
      const allCards = [...passwordCards, response.data];

      setPasswordCards(allCards);
      setNameInput('');
      setRandomPassword('');
    } catch (err) {
      console.log(err);
    }
  };

  const generatePassword = async () => {
    const _randomPassword: string = [...Array(sliderLength)].map(() => Math.random().toString(36)[2]).join('');

    setRandomPassword(_randomPassword);
  };

  const generate = (e: any) => {
    setSliderLength(e.target.valueAsNumber);
    generatePassword();
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="inputBox">
      <div className="inputBox-titleWrap">
        <h2 className="inputBox-titleWrap_title">Name of your password</h2>
        <input className="inputBox-titleWrap_input" value={nameInput} onSubmit={() => setNameInput('')} onChange={(e: any) => setNameInput(e.target.value)} type="text" name="passwordName" id="passwordName" required placeholder="Name your password" />
      </div>

      <div className="inputBox-sliderWrap">
        <input type="range" min="5" max="100" value={sliderLength} onChange={(e: any) => generate(e)} required name="passwordLength" id="passwordLength" />
        <p className="inputBox-sliderWrap_number">
          Password length:
          {' '}
          {sliderLength}
        </p>
      </div>

      <div className="inputBox-generatorWrap">
        <p className="inputBox-generatorWrap_text">{randomPassword}</p>
      </div>
      <button type="submit" onClick={handleSubmit}>Save password</button>
    </form>
  );
};

export default InputBox;
