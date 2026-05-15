import LigneBus from './LigneBus';
import './ListeLignes.css';

function ListeLignes({ lignes, onClickLigne, ligneSelectionnee }) {
  return (
    <div className="liste-lignes">
      <h2 className="liste-titre">Lignes Dakar Dem Dikk</h2>
      <p className="liste-description">
        {lignes.length} lignes disponibles
      </p>
      {lignes.map((ligne) => (
        <LigneBus
          key={ligne.id}
          numero={ligne.numero}
          depart={ligne.depart}
          arrivee={ligne.arrivee}
          arrets={ligne.arrets}
          estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
          onClick={() => onClickLigne(ligne)}
        />
      ))}
    </div>
  );
}

export default ListeLignes;