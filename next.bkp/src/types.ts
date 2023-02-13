export interface Board {
  id: number
  name: string
  location: Location
}

export interface Location {
  lat: number
  lng: number
}

export interface Company {
  id: number
  name: string
  boards: Board[]
}

export interface User {
  id: number
  name: string
  username: string
  companyId: number
}