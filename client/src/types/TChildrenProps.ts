import { ReactChild, ReactChildren, ReactElement } from 'react';

export type TChildrenProps = {
  children: ReactChild | ReactChildren | ReactChildren[] | ReactElement;
}
