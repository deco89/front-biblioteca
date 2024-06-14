declare namespace Projeto {
    type Usuario = {
        id?: number;
        nome: string;
        login: string;
        senha?: string;
        email?: string;
        category?: string;
        quantity?: number;
        inventoryStatus?: InventoryStatus;
        rating?: number;
        orders?: ProductOrder[];
        [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
    };
}