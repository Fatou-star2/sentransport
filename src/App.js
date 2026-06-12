import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Statistique from './Statistique';
import ListeLignes from './ListeLignes';
import StatReseau from './StatReseau';
import Recherche from './Recherche';
import DetailLigne from './DetailLigne';
import Carte from './Carte';
import Meteo from './Meteo';
import SignalerIncident from './SignalerIncident';

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);
  const [detailsLigne, setDetailsLigne] = useState(null);
  const [chargementDetail, setChargementDetail] = useState(false);
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  function chargerLignes() {
    setChargement(true);
    setErreur(null);
    fetch("http://localhost:5000/lignes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  useEffect(() => {
    chargerLignes();
  }, []);

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
      setDetailsLigne(null);
    } else {
      setLigneSelectionnee(ligne);
      setChargementDetail(true);
      fetch("http://localhost:5000/lignes/" + ligne.id)
        .then(response => response.json())
        .then(data => {
          setDetailsLigne(data);
          setChargementDetail(false);
        })
        .catch(() => setChargementDetail(false));
    }
  }

  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <Meteo />

        <section className="bienvenue">
          <p>Bienvenue ! Cette application vous aide a trouver votre ligne de bus a Dakar.</p>
        </section>

        <button className="bouton-recharger" onClick={chargerLignes}>
          Recharger
        </button>

        <p className="compteur-recherche">
          Vous avez effectue {nbRecherches} recherche(s)
        </p>

        <div className="stats-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0' }}>
          <Statistique chiffre="10" label="lignes" />
          <Statistique chiffre="156" label="arrets" />
          <Statistique chiffre="30" label="bus" />
        </div>

        <Recherche
          valeur={recherche}
          onChange={(valeur) => {
            setRecherche(valeur);
            setNbRecherches(nb => nb + 1);
          }}
          onEffacer={() => setRecherche("")}
        />

        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvee{lignesFiltrees.length > 1 ? 's' : ''}
        </p>

        <ListeLignes
          lignes={lignesFiltrees}
          onClickLigne={handleClickLigne}
          ligneSelectionnee={ligneSelectionnee}
        />

        {lignesFiltrees.length === 0 && (
          <p className="aucune-ligne">Aucune ligne trouvee</p>
        )}

        {chargementDetail && <p className="message-chargement">Chargement du detail...</p>}
        {detailsLigne && <DetailLigne ligne={detailsLigne} />}

        <Carte />

        <SignalerIncident />

        <StatReseau lignes={lignes} />
      </main>
      <Footer />
    </div>
  );
}

export default App;