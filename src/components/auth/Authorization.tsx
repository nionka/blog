import React from 'react';
import Button from '../UI/Button';
import { ButtonColor, ButtonSize } from '../UI/constants';
import Input from '../UI/Input';
import './auth.scss';

function Authorization(): JSX.Element {

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    console.log(name, value);
    
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log('submit auth')
  }

  return (
    <section className="authorization" >
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Логин</span>
          <Input
            customCssClass='mb'
            type='text'
            placeholder="Логин"
            name='Login'
            changeHandler={(e) => handleChange(e)}
          />
        </label>
        <label>
          <span>Пароль</span>
          <Input
            customCssClass='mb'
            type='text'
            placeholder="Пароль"
            name='password'
            changeHandler={(e) => handleChange(e)}
          />
        </label>
        <Button
          customCssClass='mt'
          color={ButtonColor.PRIMARY}
          size={ButtonSize.LARGE}
          type='submit'
          loading={false}
        >Войти</Button>
      </form>
    </section>
  )
}

export default Authorization;
