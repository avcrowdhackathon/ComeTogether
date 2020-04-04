//authReducer
export const insertToken = (token) => ({ type: 'SIGN_IN', token: token});

export const deleteToken = () => ({  type: 'SIGN_OUT' });

export const restoreToken = () => ({ type: 'RESTORE_TOKEN' });
