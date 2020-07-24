//authReducer
export const insertToken = (token) => ({ type: 'SIGN_IN', token: token});

export const deleteToken = () => ({  type: 'SIGN_OUT' });

export const restoreToken = () => ({ type: 'RESTORE_TOKEN' });


//passCodeReducer
export const setPassCode = (pass) => ({type: 'SET_PASSCODE', passCode:pass});

export const setNewCode = (pass) => ({type: 'SET_NEWCODE', newCode:pass});

export const resetPassCode = () => ({type:'RESET_PASSCODE'});

export const resetNewCode = () => ({type:'RESET_NEWCODE'});

export const setStatus = (status) => ({type:'SET_STATUS', status:status});

