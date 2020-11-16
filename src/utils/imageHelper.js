// export const getImage = (path) => `${process.env.PUBLIC}${path}`;

// eslint-disable-next-line import/prefer-default-export
export const removeExtension = (fileName = '') => {
  return (typeof fileName === 'string' ? fileName : btoa(Date.now()))
    .split('.')
    .slice(0, -1)
    .join('.');
};
