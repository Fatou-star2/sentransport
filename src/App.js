import './App.css';
import Header from './Header';
import Footer from './Footer';
import Statistique from './Statistique';
import LigneBus from './LigneBus';
import ListeLignes from './ListeLignes';

function App() {
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14 },
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obe", arrets: 18 },
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12 },
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10 },
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16 },
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11 },
  ];
  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <section className="bienvenue">
          <p>Bienvenue ! Cette application vous aide à trouver votre ligne de bus à Dakar.</p>
        </section>

        {/* Section des Statistiques */}
        <div className="stats-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0' }}>
          <Statistique chiffre="10" label="lignes" />
          <Statistique chiffre="156" label="arrêts" />
          <Statistique chiffre="30" label="bus" />
        </div>

        {/* Liste des Lignes de Bus */}
        <div className="liste-lignes">
          <LigneBus
            numero="15"
            depart="Parcelles Assainies"
            arrivee="Plateau"
            arrets={14}
          />
          <LigneBus
            numero="7"
            depart="Guediawaye"
            arrivee="Place Obe"
            arrets={18}
          />
        </div>
        {/* Utilisation du composant ListeLignes avec les données fusionnées */}
        <ListeLignes lignes={lignes} />
      </main>

      <Footer />
    </div>
  );
}

export default App;