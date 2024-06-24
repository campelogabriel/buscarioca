export type Bus = {
  ordem: string;
  linha: string;
  latitude: number;
  longitude: number;
  distancia: number;
  velocidade: string;
  datahora: string;
  destino: string;
  oldName?: string;
  noturno: boolean;
  count?: number;
  root?: number;
};
