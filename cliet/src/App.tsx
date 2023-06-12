import React, { useContext, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';

import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RegistrationPage } from './components/RegistrationPage';
import { UsersPage } from './components/UsersPage';
import LoginPage from './components/LoginPage';
import { ErrorPage } from './components/ErrorPage';
import { ProjectsPage } from './components/ProjectsPage';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <nav className="navbar has-shadow">
      <div className="navbar-start">
        <div className="buttons">
          <NavLink to={'/'} className="navbar-item">Home</NavLink>

          {store.isAuth ? (
            <NavLink to={'/projects'} className="navbar-item">Projects</NavLink>
          ) : (
            <NavLink to={'/login'} className="navbar-item">Log in</NavLink>
          )}
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
          {store.isAuth ? (
            <button
              onClick={() => store.logout()}
              className="button is-success has-text-weight-bold"
            >
              <Link
                to="/login"
                className="has-text-white"
                >
                Log out
              </Link>
            </button>
          ) : (
            <>
              <Link to="/sign-up" className="button is-light has-text-weight-bold">
                Sign up
              </Link>

              <Link to="/login" className="button is-success has-text-weight-bold">
                Log in
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>

    <main>
      <section className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="sign-up"
            element={<RegistrationPage />}
          />
          
          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route
            path="projects"
            element={<ProjectsPage />}
          />

          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>

      </section>
    </main>
  </>
}


export default observer(App);