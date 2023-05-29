import { useState } from "react";

const useLocalStorage = (key: string, initialValue: string[]) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            setStoredValue(value);

            if (typeof window !== "undefined") {
                localStorage.setItem(key, JSON.stringify(value));
                window.dispatchEvent(new Event("storage"))
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
};

export default useLocalStorage;
