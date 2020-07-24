const initialData = {
    passCode: '',
    newCode: '',
    old: true
}
  
export default  passCodeReducer = (prevState = initialData, action) => {
    switch (action.type) {
    case 'SET_PASSCODE':
        return {
        ...prevState,
        passCode: action.passCode,
        };
    case 'SET_NEWCODE':
        return {
            ...prevState,
            newCode: action.newCode,
            };
    case 'RESET_PASSCODE':
        return {
            ...prevState,
            passCode: '',
        };
    case 'RESET_NEWCODE':
        return {
            ...prevState,
            newCode: '',
        };

    case 'SET_STATUS':
        return {
            ...prevState,
            old: action.status
        };
    default:
        return prevState;  
    }
}