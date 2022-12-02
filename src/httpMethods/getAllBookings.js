import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";

export function getAllBookings(){
    return axios.get(`${bookingEndpoint}/booking`)
}