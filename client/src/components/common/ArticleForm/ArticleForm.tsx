import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IErrors } from '../../../interfaces/interfaces';
import { createArticle } from '../../../store/articles';
import { getTags } from '../../../store/tags';
import { getCurrentUserId } from '../../../store/users';
import history from '../../../utils/history';
import { validator } from '../../../utils/validator';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';
import InputSelect from '../../UI/InputSelect';
import InputText from '../../UI/InputText';
import InputTextarea from '../../UI/InputTextarea';
import './articleForm.scss';

const ArticleForm = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    tags: ''
  });
  const [errors, setErrors] = useState<IErrors>({});
  const currentUserId = useSelector(getCurrentUserId());
  const AllTags = useSelector(getTags());
  const dispatch = useDispatch();

  if (!currentUserId) history.push('/');

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const newArticle = {
      userId: currentUserId,
      ...data
    };
    dispatch(createArticle(newArticle));
  }

  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Укажите название поста'
      },
    },
    image: {
      isRequired: {
        message: 'Добавьте картинку для поста'
      }
    },
    description: {
      isRequired: {
        message: 'Укажите краткое описание'
      }
    },
    content: {
      isRequired: {
        message: 'Пост не может быть пустым'
      }
    }
  }

  const validate = () => {
    const error: any = validator(data, validatorConfig);
    setErrors(error);
    return Object.keys(error).length === 0;
  }

  return (
    <section className='articleForm'>
      <div className="container">
        <h2>Новый пост</h2>
        <form className='articleForm__form' onSubmit={handleSubmit}>
          <InputText
            customCssClass='mb'
            type='text'
            name='title'
            placeholder='Заголовок'
            error={errors.title}
            changeHandler={(e) => handleChange(e)}
          />
          <InputText
            customCssClass='mb'
            type='text'
            name='image'
            placeholder='Ссылка на картинку'
            error={errors.image}
            changeHandler={(e) => handleChange(e)}
          />
          <InputSelect
            label='Выберите тег'
            name='tags'
            value={data.tags}
            options={AllTags}
            changeHandler={(e) => handleChange(e)}
          />
          <InputTextarea
            customCssClass='h-desc'
            name='description'
            placeholder='Описание поста...'
            value={data.description}
            error={errors.description}
            changeHandler={(e) => handleChange(e)}
          />
          <InputTextarea
            customCssClass='h-cont'
            name='content'
            placeholder='Основной текст поста...'
            value={data.content}
            error={errors.content}
            changeHandler={(e) => handleChange(e)}
          />
          <Button
            customCssClass='mt al-self-end'
            color={ButtonColor.PRIMARY}
            size={ButtonSize.SMALL}
            type='submit'
          >
            Опубликовать
          </Button>
        </form>
      </div> 
    </section>
  )
}

export default ArticleForm;
