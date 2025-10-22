import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const owoce = [
    {id:1,typ:"gruszka",odmiana:"pospolita",grafika:"Pospolita.jpg",opis:"Najczęściej występująca gruszka w Polsce", sztuk:21, cena:7.55},
    {id:2,typ:"gruszka",odmiana:"Radana",grafika:"Radana.jpg",opis:"odmiana uprawna (kultywar) gruszy należąca do grupy grusz zachodnich otrzymanych w Czechach", sztuk:12, cena:6.50},
    {id:3,typ:"gruszka",odmiana:"Concorde",grafika:"Concorde.jpg",opis:"Duże o kształcie butelkowatym, wydłużone. Zbliżone wyglądem do owoców Konferencji, lecz bardziej pękate", sztuk:11, cena:4.50},
    {id:4,typ:"jabłko",odmiana:"Antonówka",grafika:"Antonowka.jpg",opis:"Średniej wielkości, o zmiennym kształcie najczęściej kulistym lub nieco wydłużonym, niesymetryczne", sztuk:12, cena:4.50},
    {id:5,typ:"jabłko",odmiana:"Gala",grafika:"Gala.jpg",opis:"Średniej wielkości, o zmiennym kształcie najczęściej kulistym lub nieco wydłużonym, niesymetryczne", sztuk:8, cena:6.33},
    {id:6,typ:"jabłko",odmiana:"Jonagold",grafika:"Jonagold.jpg",opis:"Duże lub bardzo duże, stożkowato-kuliste, czasem nieregularne, przy kielichu lekko żebrowane", sztuk:21, cena:3.56},
    {id:7,typ:"jabłko",odmiana:"Ligol",grafika:"Ligol.jpg",opis:"Duże lub bardzo duże kształtu kulisto-stożkowatego", sztuk:11, cena:4.32},
    {id:8,typ:"śliwka",odmiana:"Domowa",grafika:"Domowa.jpg",opis:"odmiany o pestkach łatwo odchodzących od miąższu owocu", sztuk:21, cena:7.49},
    {id:9,typ:"śliwka",odmiana:"Kalifornijska",grafika:"Kalifornijska.jpg",opis:"Granatowe, wydłużone, przy szypułce zwężone, czasem elipsoidalne lub jajowate, miąższ zwięzły, aromatyczny, winnosłodki, dobrze odchodzi od pestki", sztuk:13, cena:9.43}

]

function Fruits() {
    const [fruits, setFruits] = useState([ ...owoce]);
    const [cart, setCart] = useState({});
    const [filters, setFilters] = useState({
        jabłko: true,
        gruszka: true,
        śliwka: true
    })

    const toggle = (typ) => {
        setFilters(prev => ({ ...prev, [typ]: !prev[typ]}));
    };

    const addToCart = (id) => {
        setFruits((prev) => prev.map((f) => f.id === id && f.sztuk > 0 ? { ...f, sztuk: f.sztuk - 1} : f)
        )
        setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) +1 }));
    };

    const showCart = () => {
        const arr = Object.entries(cart).map(([id, sztuk]) => ({
            id: Number(id), sztuk }));
        console.log(JSON.stringify(arr));
    };

    const visible = fruits.filter(f => filters[f.typ]);

    return (
        <div style={{ padding: 16 }} className="App">
            <div style={{ marginBottom: 12 }}>
                <label style={{ marginRight: 10}}>
                    <input type="checkbox" checked={filters.jabłko} onChange={() => toggle("jabłko")} />Jabłka
                </label>
                <label style={{ marginRight: 10}}>
                    <input type="checkbox" checked={filters.gruszka} onChange={() => toggle("gruszka")} />Gruszki
                </label>
                <label style={{ marginRight: 10}}>
                    <input type="checkbox" checked={filters.śliwka} onChange={() => toggle("śliwka")} />Śliwki
                </label>

                <button style={{ marginBottom: 12 }} onClick={showCart}>Pokaż koszyk</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {visible.map(f => (
                    <div key={f.id} style={{ border: "1px solid black", borderRadius: 4, padding: 8}}>
                        <div><strong>{f.id}. {f.typ} - {f.odmiana}</strong></div>
                        {f.grafika && (
                            <img src={f.grafika} alt={f.odmiana} style={{ width: "100%", height: 140, objectFit: "cover", margin: "8px 0" }}/>
                        )}
                        {f.opis && <div style={{ fontSize: 13 }}>{f.opis}</div>}
                        <div>Cena: {f.cena} zł</div>
                        <div>Dostępne: {f.sztuk}</div>
                        <button onClick={() => addToCart(f.id)} disabled={f.sztuk <= 0} style={{ marginTop: 8 }}>
                            Do koszyka
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fruits;
