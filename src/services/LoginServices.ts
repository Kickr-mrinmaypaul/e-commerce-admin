import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const LoginServices = {
    login:(data: any)=> api.post(API_ENDPINTS.login, data),
}

export default LoginServices;