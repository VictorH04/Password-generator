import { useEffect } from 'react';
import api from '../api/api';
import { IPasswordState } from '../interfaces';

interface IPasswordCardItems {
    id: string,
    title: string,
    dateTime: string,
    password: string,
}

interface ICardProps {
    passwordCards: IPasswordCardItems[],
    setPasswordCards: (response: any[]) => void,
}

const Cards = ({ passwordCards, setPasswordCards }: ICardProps) => {
  useEffect(() => {
    const fetchPasswordCards = async () => {
      try {
        const response: any = await api.get('/generatedPasswords');
        setPasswordCards(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPasswordCards();
  }, []);

  return (
    <div>
      {passwordCards ? (
        passwordCards.map((item: IPasswordCardItems) => (
          <h1>{item.password}</h1>
        ))
      ) : ('No cards')}
    </div>
  );
};

export default Cards;
