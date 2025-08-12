export interface Intervention {
  intervention_id?: number;
  operation_id: number;
  date_planifiee: Date | string;
  date_livraison?: Date | string;
  statut: string;
  responsable?: string;
  type_intervention?: string;
  notes?: string;
}

export interface StatusStats {
  statut: string;
  count: number;
}

export interface TimelineStats {
  period: string;
  count: number;
}

export interface ResponsibleWorkload {
  responsable: string;
  total_interventions: number;
  in_progress: number;
  completed: number;
}

export interface TypeDistribution {
  type_intervention: string;
  count: number;
  percentage: number;
}