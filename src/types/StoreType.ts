export type StoreType = {
  id: number
  nome: string
  capa: string
  lat: number
  lng: number
  categorias: {
    id: number
    label: string
  }[]
  enderecos: {
    id: number
    lat: number
    lng: number
    label: string
  }[]
}

export type StoreCategoryType = {
  id: number
  label: string
  count: number
}
