function getDataFromLocalStorage(storageName) {
    try {
        const data = JSON.parse(localStorage.getItem(storageName));
        
        if (typeof data === 'object' && data !== null) {
            return data
        }

        return {}; //Если не проходит валидацию, то возвращает пустой объект
    } catch(e) {
        console.log(e.messsage);
    }
}

function setDataToLocalStorage(storageName, data) {
    localStorage.setItem(storageName, JSON.stringify(data));
}

export { getDataFromLocalStorage, setDataToLocalStorage };