import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";

import {bookingId} from "../test/collectionExample.test"



export function updateUserBooking(body,headers){
    return axios.put(`${bookingEndpoint}/booking/${bookingId}`,body,headers);  
}