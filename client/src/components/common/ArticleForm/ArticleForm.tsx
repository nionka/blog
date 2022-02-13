import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IErrors } from '../../../types/interfaces/IErrors';
import {
  createArticle, getArticle, getArticleLoader, loadArticle, updateArticle,
} from '../../../store/articles';
import { getTags } from '../../../store/tags';
import { getCurrentUserId } from '../../../store/users';
import history from '../../../utils/history';
import validator from '../../../utils/validator';
import Button from '../../UI/Button';
import { ButtonColor, ButtonSize } from '../../UI/constants';
import InputSelect from '../../UI/InputSelect';
import InputText from '../../UI/InputText';
import InputTextarea from '../../UI/InputTextarea';
import Loader from '../Loader/Loader';
import './articleForm.scss';
import { TParams } from '../../../types/TParams';
import { IArticleForm } from '../../../types/interfaces/IArticle';

function ArticleForm({ match }: RouteComponentProps<TParams>) {
  const { id } = match.params;
  const articleLoader = useSelector(getArticleLoader());
  const article = useSelector(getArticle());

  const initialState = id ? {
    title: article?.title,
    description: article?.description,
    content: article?.content,
    image: article?.image,
    tags: article?.tags,
  } : {
    title: '',
    description: '',
    content: '',
    image: '',
    tags: '',
  };

  const [data, setData] = useState<IArticleForm>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  const currentUserId = useSelector(getCurrentUserId());
  const AllTags = useSelector(getTags());
  const dispatch = useDispatch();

  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Укажите название поста',
      },
    },
    image: {
      isRequired: {
        message: 'Добавьте картинку для поста',
      },
      isImage: {
        message: 'Ссылка должна вести на картинку',
      },
    },
    description: {
      isRequired: {
        message: 'Укажите краткое описание',
      },
    },
    content: {
      isRequired: {
        message: 'Пост не может быть пустым',
      },
    },
  };

  const validate = (): boolean => {
    const error: IErrors = validator(data, validatorConfig);
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    if (id) {
      if (!articleLoader) {
        validate();
      }
    } else {
      validate();
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      dispatch(loadArticle(id));
    }
  }, []);

  useEffect(() => {
    setData(initialState);
  }, [articleLoader]);

  if (id && article?.userId !== currentUserId) history.push('/');

  if (id && articleLoader) {
    return <Loader />;
  }

  const handleChange = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const newArticle = {
      userId: currentUserId,
      ...data,
    };

    if (id) {
      dispatch(updateArticle(id, data));
    } else {
      dispatch(createArticle(newArticle));
    }
  };

  return (
    <section className="articleForm">
      <div className="container">
        <h2>{id ? 'Редактировать пост' : 'Новый пост'}</h2>
        <form className="articleForm__form" onSubmit={handleSubmit}>
          <InputText
            customCssClass="mb"
            type="text"
            name="title"
            value={data.title}
            placeholder="Заголовок"
            error={errors.title}
            changeHandler={(e) => handleChange(e)}
          />
          <InputText
            customCssClass="mb"
            type="text"
            name="image"
            value={data.image}
            placeholder="Ссылка на картинку"
            error={errors.image}
            changeHandler={(e) => handleChange(e)}
          />
          <InputSelect
            label="Выберите тег"
            name="tags"
            defaultValue={data.tags}
            options={AllTags}
            changeHandler={(e) => handleChange(e)}
          />
          <InputTextarea
            customCssClass="h-desc"
            name="description"
            placeholder="Описание поста..."
            value={data.description}
            error={errors.description}
            changeHandler={(e) => handleChange(e)}
          />
          <InputTextarea
            customCssClass="h-cont"
            name="content"
            placeholder="Основной текст поста..."
            value={data.content}
            error={errors.content}
            changeHandler={(e) => handleChange(e)}
          />
          <Button
            customCssClass="mt al-self-end"
            color={ButtonColor.PRIMARY}
            size={ButtonSize.SMALL}
            type="submit"
          >
            Опубликовать
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ArticleForm;
