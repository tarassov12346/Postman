import * as variable from "../utils/globalVariables"
import * as preRequest from "./preRequest"

export const updateUserBookingBody = {
    firstname : variable.userFirstName,
    lastname : variable.userLastName,
    totalprice :  preRequest.priceNew,
    depositpaid : false,
    bookingdates :
        {
            checkin : "2022-11-29",
            checkout :"2022-12-20"
        },
    additionalneeds : variable.additionalNeeds
}
