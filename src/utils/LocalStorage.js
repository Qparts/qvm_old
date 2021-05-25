export const SaveData = async (key, value) => {
    try {
        await localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
    }
}

export const GetData = async (key) => {
    const data = await localStorage.getItem(key);
    if (data == null && data != undefined)
        return null;
    else
        return JSON.parse(data);
}

export const RemoveData = async (key) => {
    await localStorage.removeItem(key);
}

export const saveMap = async (key, value) => {
    await localStorage.setItem(key, JSON.stringify([...value]));
}

export const getMap = (key) => {
    const jsonData = localStorage.getItem(key);
    if (jsonData == null)
        return null;
    const mapData = new Map(jsonData)
    return mapData
}