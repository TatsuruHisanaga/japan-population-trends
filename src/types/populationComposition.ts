export interface PopulationComposition {
  label: string,
  data:[
    year: number,
    value: number,
    rate?: number
  ]
  
}
export interface PopulationCompositionData {
  [key: number]: PopulationComposition[];
}