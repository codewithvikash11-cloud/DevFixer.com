import { getSettings, updateSettings } from './actions/settings';

export const settingsHelper = {
    getAll: async () => {
        return await getSettings();
    },
    get: async (key) => {
        const settings = await getSettings();
        return settings[key];
    },
    set: async (key, value) => {
        const settings = await getSettings();
        settings[key] = value;
        return await updateSettings(settings);
    },
    setMany: async (data) => {
        return await updateSettings(data);
    }
};
