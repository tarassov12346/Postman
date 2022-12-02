import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";

import {bookingId} from "../test/collectionExample.test"



export function deleteUserBooking(headers){
    return axios.delete(`${bookingEndpoint}/booking/${bookingId}`,headers);  
}