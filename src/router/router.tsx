import { Location } from 'history'
import { Spin } from 'antd'
import * as classNames from 'classnames'
import * as React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Example } from '../pages/example/example'
import * as style from './router.css'

interface RouterProps {
  loading: boolean
  apiError: boolean
}
let pathname: string
let key: string
export const AppRouter: React.FunctionComponent<RouterProps> = (routerProps: RouterProps): JSX.Element => {
  return (
    <BrowserRouter>
      <Route
        render={(props: { location: Location }) => {
          const { location } = props
          if (location.pathname === pathname) {
            location.key = key
          } else {
            pathname = location.pathname
            key = location.key
          }

          return (
            <div className={style.router}>
              {routerProps.loading ? (
                <div className={style.routerContent}>
                  <div>
                    <Spin className='loading' size='large' />
                  </div>
                </div>
              ) : (
                <div className={style.routerContent}>
                  <TransitionGroup className={style.transitionGroup}>
                    <CSSTransition
                      key={location.key}
                      classNames={classNames(style.transitionPage, 'fade')}
                      timeout={500}
                    >
                      <Switch location={location}>
                        <Route exact path='/' render={() => <Redirect to='/example' />} />

                        <Route exact path='/example' component={Example} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              )}
            </div>
          )
        }}
      />
    </BrowserRouter>
  )
}
