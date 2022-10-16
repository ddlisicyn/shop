function getDataFromLocalStorage(storageName, ) {
    try {
        return JSON.parse(localStorage.getItem(storageName));
    } catch(e) {
        console.log(e.messsage);
    }
}

function setDataToLocalStorage(storageName, data) {
    localStorage.setItem(storageName, JSON.stringify(data));
}

export { getDataFromLocalStorage, setDataToLocalStorage };