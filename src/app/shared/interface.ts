
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
    hex: any,
    size: boolean [],
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

export interface ProductBrand {
    name: string,
    linkeBrand: string,
    src: string,
    size: {XS: boolean, S: boolean, M: boolean, L: boolean, XL: boolean, XXL: boolean},
    productColor: string []
}

export interface OrderDatas {
    productTypeName: string,
    brendName: string,
    productColor: string,
    colorDefoult: string
    productSize: string
}









