export interface CategoryDetails {
    id: string;
    name: string;
}

export interface CategoryCreation {
    name: string;
    parentId: string;
}

export interface CategoryUpdate extends CategoryCreation {
    id: string;
}