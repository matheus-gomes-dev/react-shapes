// const changeMode = mode => ({ type: 'CHANGE_MODE', payload: mode });

const changeMode = mode => {
    console.log('changeMode!');
    return ({ type: 'CHANGE_MODE', payload: mode });
}

export default changeMode;
