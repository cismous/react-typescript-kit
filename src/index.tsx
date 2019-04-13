import 'antd/dist/antd.less'
import './assets/styles/base.css'

import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppRouter } from './router/router'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function cacheData(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: Promise<any>[] = []
  await Promise.all(promises)
}

const rootEl = document.getElementById('root')
const APP = (loading: boolean = false, apiError: boolean = false): JSX.Element => (
  <LocaleProvider locale={zhCN}>
    <AppRouter loading={loading} apiError={apiError} />
  </LocaleProvider>
)

ReactDOM.render(APP(true), rootEl)

cacheData()
  .then(() => {
    ReactDOM.render(APP(), rootEl)
  })
  .catch(() => {
    ReactDOM.render(APP(), rootEl)
  })
