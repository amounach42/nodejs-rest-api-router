import "./App.css";
import CardsBook from "./component/CardsBook";
import axios from "axios";
import { useEffect, useState } from "react";

export interface CardType {
  id: number | string ;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  isbn: string;
  pageCount: number;
  language: string;
  path: string
}

const JSON_API = "http://localhost:9000/api/books";

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await axios.get<CardType[]>(JSON_API);
        console.log(res.data);
        setCards(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getCards();
  }, []);
  return (
    <div className=" w-screen h-screen bg-slate-200">
      <div className="container w-full h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2  mx-auto bg-gradient-to-t from-slate-300 to-slate-400 shadow-2xl shadow-black">
        {cards.length > 0 &&
          cards.map((card: CardType) => {
            return (
              <div key={card.id} className="">
                <CardsBook card={card} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
