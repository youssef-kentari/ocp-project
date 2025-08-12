export interface SousEnsemble {
  sous_ensemble_id?: number;
  engin_id: string;
  designation: string;
  type_sous_ensemble?: string;
  quantite_installee?: number;
  sous_ensemble_relais_disponible?: number;
  sous_ensemble_en_attente_revision?: number;
  sous_ensemble_encours_revision?: number;
  corps_sous_ensembles_disponibles?: number;
  prix_sous_ensemble_neuf_DH?: number;
  duree_revision_jours?: number;
  cout_revision_MAD?: number;
  heures_marche_actuel?: number;
  heures_marche_cible?: number;
  heures_marche_annee?: number;
  nombre_revisions_avant_reforme?: number;
  fournisseur?: string;
  delai_livraison_apres_commande_jours?: string;
  mode_gestion_actuel?: string;
  besoin_global_annuel?: number;
}

export interface SousEnsembleKPI {
  disponibility_rate?: number;
  revision_occupation_rate?: number;
  total_maintenance_cost?: number;
  performance_ratio?: number;
  time_to_next_revision?: number;
  safety_stock_need?: number;
  roi?: number;
}