import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    description: string;
    category: string;
    price: number;
}
export interface Feature {
    name: string;
    description: string;
}
export interface RestaurantInfo {
    hours: string;
    tagline: string;
    name: string;
    address: string;
}
export interface backendInterface {
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getFeatures(): Promise<Array<Feature>>;
    getMenuCategories(): Promise<Array<[string, Array<string>]>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
}
