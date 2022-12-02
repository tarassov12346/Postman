import {endpoint} from "../utils/globalVariables";
import axios from "axios";

export function getFirstUser(){
    return axios.get(`${endpoint}`)
}
