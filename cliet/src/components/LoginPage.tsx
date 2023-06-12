import cn from 'classnames';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const LoginPage: React.FC = () => {
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const { store } = useContext(Context)

  const handleSetNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSetNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="content">
      <form
        className="box"
      >
        <h1 className="title">Log in</h1>

        <div className="field">
          <label className="label">Email</label>

          <div className="control has-icons-left has-icons-right">
            <input
              name="email"
              type="email"
              id="email"
              placeholder="willsmith@gmail.com"
              className={cn('input')}
              required
              value={email}
              onChange={handleSetNewEmail}
            />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>

          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>

          <div className="control has-icons-left has-icons-right">
            <input
              name="password"
              type="password"
              id="password"
              placeholder="******"
              className={cn('input')}
              value={password}
              onChange={handleSetNewPassword}
            />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>

              <p className="help">At least 4 characters</p>
          </div>
        </div>

        <div className="field">
          <button
            className={cn('button is-success has-text-weight-bold')}
            onClick={() => store.login(email, password)}
          >
            {/* {store.isAuth ? (
              <Link
              className='has-text-white'
              to="/projects"
            > */}
              Log In
            {/* </Link>
            ) : "Log In"} */}
          </button>
        </div>

        Do not have an account?
        {' '}
        <Link to="/sign-up">Sign up</Link>
      </form>
    </div>
  );
};

export default observer(LoginPage);