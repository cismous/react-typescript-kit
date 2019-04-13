export interface ResponseBody<ResponseData> {
  data: ResponseData
  resultCode: string
  returnMsg: string
}

export enum FETCH_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const PREFIX = '/meta/api/web/v1/bill/'
let hasJumpSSOPage = false

class ResponseError extends Error {
  public code: number
  public constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
  }
}

function generateRequestHeader<RequestBody>(method: FETCH_METHOD, data: RequestBody = null): RequestInit {
  const header: RequestInit = {
    method,
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    referrer: 'no-referrer',
    body: data ? JSON.stringify(data) : '',
  }
  return header
}

function handleResponseData<T>(data: ResponseBody<T>): T {
  const code = Number(data.resultCode)
  if (code === 401) {
    if (!hasJumpSSOPage) location.href = `${data.data}&jumpto=${encodeURIComponent(location.href)}`
    hasJumpSSOPage = true
    throw new ResponseError(code, '登录已过期')
  } else if (code === 0) {
    return data.data
  }
  throw new ResponseError(code, data.returnMsg || data.data.toString())
}

export async function get<ResponseData, Params = {}>(url: string, params?: Params): Promise<ResponseData> {
  let _url: URL = new URL(PREFIX + url, window.location.origin)
  if (params) {
    for (const key of Object.keys(params) as (keyof Params)[])
      _url.searchParams.append(key.toString(), params[key].toString())
  }
  const response = await fetch(_url.href, { credentials: 'same-origin' })
  const responseData: ResponseBody<ResponseData> = await response.json()
  return handleResponseData<ResponseData>(responseData)
}

export async function request<ResponseData, RequestBody = {}>(
  method: FETCH_METHOD,
  url: string,
  data: RequestBody = null,
): Promise<ResponseData> {
  const response = await fetch(PREFIX + url, generateRequestHeader<RequestBody>(method, data))
  return handleResponseData<ResponseData>(await response.json())
}
