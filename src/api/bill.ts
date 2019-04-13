import { get } from './fetch'
import { ExampleParams, ExampleData } from './bill.d'

export const defaultParams: ExampleParams = {
  test: '',
}

export const exampleApi = {
  /**
   * 资产账单
   */
  async example(params: ExampleParams = defaultParams) {
    const data = await get<ExampleData, ExampleParams>('person/assetBill', params)
    return data
  },
}
