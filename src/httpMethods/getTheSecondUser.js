import {endpoint} from "../utils/globalVariables";
import {gender} from "../test/collectionExample.test";
import {nat} from "../test/collectionExample.test"
import axios from "axios";


export function getTheSecondUser(){
    return axios.get(`${endpoint}/?gender=${gender}&nat=${nat}`);
}
