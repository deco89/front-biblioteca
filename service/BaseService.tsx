import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
})

export class BaseService {

    url: string;

    constructor(url: string) {
        this.url = url;
    }

    listarTodos() {
        return axiosInstance.get(this.url);
    }

    buscarUsuarioPorId(id : number) {
        return axiosInstance.get("/usuario/" + id)
    }

    inserir(objeto : any) {
        return axiosInstance.post(this.url, objeto);
    }

    alterar(objeto : any) {
        return axiosInstance.put(this.url, objeto);
    }

    excluir(id : number) {
        return axiosInstance.delete(this.url + "/" + id)
    }
}