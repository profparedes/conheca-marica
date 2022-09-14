export type EventType = {
  id: number
  nome: string
  capa: string
  lat: number
  lng: number
  categorias: {
    id: number
    label: string
  }[]
  datahora_inicio: string
  enderecos: {
    id: number
    lat: number
    lng: number
    label: string
  }[]
}

export type EventCategoryType = {
  id: number
  label: string
  count: number
}
