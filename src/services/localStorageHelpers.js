export const loadState = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : undefined;
    } catch (err) {
        console.log("Error Loading from LocalStorage", err);
        return undefined;
    }
}

export const saveState = (key, state) => {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
        console.log("Error saving into Local Storage", err);
    }
}