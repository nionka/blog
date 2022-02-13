import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IErrors } from '../../types/interfaces/IErrors';
import { authErrorDelete, getAuthErrors, signIn } from '../../store/users';
import validator from '../../utils/validator';
import Button from '../UI/Button';
import { ButtonColor, ButtonSize } from '../UI/constants';
import InputText from '../UI/InputText';
import './auth.scss';

function Authorization() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<IErrors>({});
  const authErrors = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Укажите электронную почту',
      },
      isEmail: {
        message: 'Некорректный Email',
      },
    },
    password: {
      isRequired: {
        message: 'Укажите пароль',
      },
    },
  };

  const validate = (): boolean => {
    const error: IErrors = validator(data, validatorConfig);
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (e: React.ChangeEvent): void => {
    if (authErrors) {
      dispatch(authErrorDelete());
    }
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    dispatch(signIn(data));
  };

  if (authErrors) {
    const customId = 'authErrors';
    toast.error(authErrors, {
      toastId: customId,
    });
  }

  return (
    <section className="authorization">
      <form className="form" onSubmit={handleSubmit}>
        <InputText
          customCssClass="mb"
          type="text"
          placeholder="Email"
          name="email"
          value={data.email}
          changeHandler={(e) => handleChange(e)}
          error={errors.email}
        />
        <InputText
          customCssClass="mb"
          type="password"
          placeholder="Пароль"
          name="password"
          value={data.password}
          changeHandler={(e) => handleChange(e)}
          error={errors.password}
        />
        <Button
          customCssClass="mt"
          color={ButtonColor.PRIMARY}
          size={ButtonSize.LARGE}
          type="submit"
          loading={false}
        >
          Войти
        </Button>
      </form>
    </section>
  );
}

export default Authorization;
