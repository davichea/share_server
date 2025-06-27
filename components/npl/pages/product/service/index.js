import { CrudBaseService } from "@/services/http/crudServices";

export class productApi extends CrudBaseService {
    constructor(pathUrl) {
        super(
            process.env.NEXT_PUBLIC_API_BASE_URL,
            pathUrl,
        );

    }
}

export const baseUrl = '/api'
export const getAllProducts = new productApi(`${baseUrl}/products`)
export const getProductById = new productApi(`${baseUrl}/products`)
export const searchProduct = new productApi(`${baseUrl}/products/search`)