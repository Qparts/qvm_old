import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 1440;


export const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now(),
        };
        await localStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        logger.log(error);
    }
};

const isExpired = (item) => {
    const now = dayjs();
    const sotredTime = dayjs(item.timestamp);
    return now.diff(sotredTime, "minute") > expiryInMinutes;
};

export const get = async (key, checkExpiry) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);

        if (!item) return null;

        if (isExpired(item) && checkExpiry) {
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;
    } catch (error) {
        logger.log(error);
    }
};

