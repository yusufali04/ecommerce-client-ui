export interface Tenant {
    id: string,
    name: string,
    address: string,
    updatesAt: string,
    createdAt: string
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "additional";
        availableOptions: string[];
    };
}

export interface ProductPriceConfiguration {
    [key: string]: {
        priceType: "base" | "additional";
        availableOptions: {
            [key: string]: number
        };
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export type ProductAttribute = {
    name: string;
    value: string | boolean;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    priceConfiguration: ProductPriceConfiguration;
    attributes: ProductAttribute[];
    tenantId: string;
    category: Category;
    image: string;
    isPublished: string;
}

export type Topping = {
    _id: string;
    name: string;
    price: number;
    image: string;
    isAvailable: boolean;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "customer" | "admin" | "manager";
    tenantId: number | null;
}

export interface Session {
    user: User
}

export interface Address {
    text: string;
    isDefault: boolean;
}

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    tenantId: string;
    addresses: Address[];
}

export interface VerifyCouponData {
    code: string;
    tenantId: string;
}