const initialData = {
    passCode: '',
    newCode: '',
    confCode: '',
    old: true,
    repeat:false
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
    case 'SET_REPEAT':
        return {
            ...prevState,
            repeat: action.status
        };   
    case 'SET_CONFCODE':
        return {
            ...prevState,
            confCode: action.confCode
        };
    case 'RESET_CONFCODE':
        return {
            ...prevState,
            confCode: ''
        };     
    default:
        return prevState;  
    }
}