export interface User {
    email: string,
    password: string
}

export interface Images {
    name: string,
    imageSrc?: string,
    user?: string,
    _id?: string
}

export interface Products {
    name: string,
    type?: string,
    type1?: string
    user?: string,
    _id?: string,
    hex: any
}

export interface Fonts {
    // name: string,
    // value: string,
    // user?: string,
    // _id?: string
}

export interface ProductsColor {
    name: string,
    hex: string,
    user?: string,
    _id?: string
}






