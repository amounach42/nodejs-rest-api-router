import { CardType } from "../App";

const CardsBook = ({card } : {card : CardType}) =>{
    return (
        <section className="section">
            <img className="image" src={card.path} title="the_great_gatsby" alt=""/>
            <div className="bg-div">
                <div className="blur_background"> </div>
                <h3 className="title">{card.title}</h3>
                <p className="author" style={{fontSize: "10px"}}>{card.author} - {card.publicationYear}</p>
        </div>
        </section>
    )
}

export default CardsBook;
