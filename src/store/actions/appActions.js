import { APP_LOADING } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const globalLoading = boolean => ({
  type: APP_LOADING,
  state: boolean,
})
