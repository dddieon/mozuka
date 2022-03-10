export interface IItem {
  uuid: string,
  url: string,
  imageUrl: string,
  name: string,
  price: number,
}

export interface IResult {
  id: number,
  price: number,
  option: string,
  item: IItem
}

export interface IGift {
  id: string,
  giverName: string,
  getterName: string,
  maxBudget: number,
  minimumBudget: number,
  password: string,
  retryCount: number,
  results: IResult[]
}
