export interface PopulationComposition {
  year: number
  value: number
}

export interface PopulationCompositionData {
  [key: number]: PopulationComposition[]
}
