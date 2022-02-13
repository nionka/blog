import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IErrors } from '../../types/interfaces/IErrors';
import { authErrorDelete, getAuthErrors, signUp } from '../../store/users';
import validator from '../../utils/validator';
import Button from '../UI/Button';
import { ButtonColor, ButtonSize } from '../UI/constants';
import InputCheckBox from '../UI/InputCheckBox';
import InputRadio from '../UI/InputRadio';
import InputText from '../UI/InputText';
import './auth.scss';
import { IUserRegister } from '../../types/interfaces/IUserRegister';

function Registration() {
  const [data, setData] = useState<IUserRegister>({
    email: '',
    password: '',
    name: '',
    gender: 'male',
    licence: false,
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
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состаять миниму из 8 символов',
        value: 8,
      },
    },
    name: {
      isRequired: {
        message: 'Укажите имя',
      },
    },
    licence: {
      isRequired: {
        message: 'Необходимо подтвердить лицензионное соглашение',
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
    if (name === 'licence') {
      setData((prev) => ({ ...prev, licence: !data.licence }));
      return;
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    dispatch(signUp(data));
  };

  if (authErrors) {
    const customId = 'authErrors';
    toast.error(authErrors, {
      toastId: customId,
    });
  }

  return (
    <section className="registration">
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
        <InputText
          customCssClass="mb"
          type="text"
          placeholder="Имя"
          name="name"
          value={data.name}
          changeHandler={(e) => handleChange(e)}
          error={errors.name}
        />
        <InputRadio
          label="Ваш пол"
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' },
          ]}
          value={data.gender}
          name="gender"
          changeHandler={handleChange}
        />
        <InputCheckBox
          label="Подтвердить лицензионное соглашение"
          value={data.licence}
          name="licence"
          error={errors.licence}
          changeHandler={(e) => handleChange(e)}
        />
        <Button
          customCssClass="mt"
          color={ButtonColor.PRIMARY}
          size={ButtonSize.LARGE}
          type="submit"
          loading={false}
        >
          Зарегистрироваться
        </Button>
      </form>
    </section>
  );
}

export default Registration;
