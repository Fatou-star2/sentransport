 import './App.css';
import Header from './Header';
import Footer from './Footer';
import Statistique from './Statistique';
import LigneBus from './LigneBus';
import ListeLignes from './ListeLignes';
import StatReseau from './StatReseau';

function App() {
  const lignes = [
    { id: 1,  numero: "1",  depart: "Parcelles Assainies", arrivee: "Plateau",     arrets: 14, couleur: "#e17569" },
    { id: 2,  numero: "7",  depart: "Guediawaye",          arrivee: "Place Obe",   arrets: 18, couleur: "#174360" },
    { id: 3,  numero: "15", depart: "Pikine",              arrivee: "Medina",      arrets: 12, couleur: "#5a4f0b" },
    { id: 4,  numero: "23", depart: "Ouakam",              arrivee: "Grand Dakar", arrets: 10, couleur: "#8e4607" },
    { id: 5,  numero: "8",  depart: "Almadies",            arrivee: "Colobane",    arrets: 16, couleur: "#410a46" },
    { id: 6,  numero: "12", depart: "Yoff",                arrivee: "Sandaga",     arrets: 11, couleur: "#791f51" },
    { id: 7,  numero: "4",  depart: "Fann",                arrivee: "HLM",         arrets: 9,  couleur: "#053657" },
    { id: 8,  numero: "9",  depart: "Liberté",             arrivee: "Dieuppeul",   arrets: 13, couleur: "#05431e" },
    { id: 9,  numero: "17", depart: "Sicap",               arrivee: "Medina",      arrets: 8,  couleur: "#630c02" },
    { id: 10, numero: "6",  depart: "HLM",                 arrivee: "Plateau",     arrets: 15, couleur: "#5c2a09" },
  ];

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <section className="bienvenue">
          <p>Bienvenue ! Cette application vous aide à trouver votre ligne de bus à Dakar.</p>
        </section>

        <div className="stats-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0' }}>
          <Statistique chiffre="10" label="lignes" />
          <Statistique chiffre="156" label="arrêts" />
          <Statistique chiffre="30" label="bus" />
        </div>

        <div className="liste-lignes">
          <LigneBus numero="15" depart="Parcelles Assainies" arrivee="Plateau" arrets={14} couleur="#5e0942" />
          <LigneBus numero="7" depart="Guediawaye" arrivee="Place Obe" arrets={18} couleur="#064452" />
        </div>

        <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>

      <Footer />
    </div>
  );
}

export default App;