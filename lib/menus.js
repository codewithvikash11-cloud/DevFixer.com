import { getMenus, createMenu, updateMenu, deleteMenu, reorderMenus } from './actions/menus';

export const menusHelper = {
    getAll: async () => getMenus(),
    create: async (data) => createMenu(data),
    update: async (id, data) => updateMenu(id, data),
    delete: async (id) => deleteMenu(id),
    reorder: async (items) => reorderMenus(items)
};
