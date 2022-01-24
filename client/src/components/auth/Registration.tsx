import React from 'react';
import Button from '../UI/Button';
import { ButtonColor, ButtonSize } from '../UI/constants';
import Input from '../UI/Input';
import './auth.scss';

function Registration(): JSX.Element {

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    console.log(name, value);
    
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log('submit registr')
  }

  return (
    <section className="registration" >
      <form className="form" onSubmit={handleSubmit}>
        <Input
          customCssClass='mb'
          type='text'
          placeholder="Логин"
          name='Login'
          changeHandler={(e) => handleChange(e)}
        />
        <Input
          customCssClass='mb'
          type='text'
          placeholder="Пароль"
          name='password'
          changeHandler={(e) => handleChange(e)}
        />
        <Button
          customCssClass='mt'
          color={ButtonColor.PRIMARY}
          size={ButtonSize.LARGE}
          type='submit'
          loading={false}
        >Зарегистрироваться</Button>
      </form>
    </section>
  )
}

export default Registration;
