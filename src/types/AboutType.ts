export type AboutType = {
  id: number
  nome: string
  email: string
  has_delivery: boolean
  has_delivery_order: number
  primaria: string
  secundaria: string
  cinza: string
  logo: null
  background: null
  telefones: []
  redes: []
  fotos: []
  sobre: {
    id: number
    app_id: number
    content: string
  }[]
}
