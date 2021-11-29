import { useEffect, useState } from 'react';
import api from '../api/api';
import { IPasswordCardItems } from '../interfaces';

interface ICardProps {
  passwordCards: IPasswordCardItems[],
  setPasswordCards: (passwordCardsRes: any[]) => void,
  handleDelete: (cardId: string) => void,
}

const Cards = ({ passwordCards, setPasswordCards, handleDelete }: ICardProps) => {
  const [cardLoading, setCardLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPasswordCards = async () => {
      try {
        setCardLoading(true);
        const passwordCardsRes = await api.get('/generatedPasswords');
        setPasswordCards(passwordCardsRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setCardLoading(false);
      }
    };

    fetchPasswordCards();
  }, []);

  const showCardPassword = (cardId: string) => {
    const currentCardIndex = passwordCards.findIndex(
      (card: IPasswordCardItems) => card.id === cardId,
    );

    const tmpPasswordCards = [...passwordCards];

    tmpPasswordCards[currentCardIndex]
      .showPassword = !tmpPasswordCards[currentCardIndex].showPassword;

    setPasswordCards(tmpPasswordCards);

    console.log(currentCardIndex);
  };

  return (
    <div>
      {cardLoading
        && <h1>Loading...</h1>}

      {!cardLoading && (passwordCards.length ? (
        passwordCards.map((card: IPasswordCardItems) => (
          <>
            <div className="passwordCard">
              <h1 className="passwordCard-title">
                Password to:
                {' '}
                {card.title}
              </h1>
              <h2 className="passwordCard-createdAt">
                Created at:
                {' '}
                {card.dateTime}
              </h2>
              <h2 className="passwordCard-password">
                {!card.showPassword ? [...Array(card.password.length)].map(
                  () => <p>&#9679;</p>,
                ) : `Your password: ${card.password}`}
              </h2>
              <button type="button" className="passwordCard-showPasswordBtn" onClick={() => showCardPassword(card.id)}>Show password</button>
              <button type="button" className="passwordCard-deleteBtn" onClick={() => handleDelete(card.id)}>Delete card</button>
            </div>
            <h1>{card.showPassword}</h1>
          </>
        ))
      ) : (
        <h1>No cards</h1>
      ))}
    </div>
  );
};

export default Cards;
