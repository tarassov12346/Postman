import * as variable from "../utils/globalVariables"
import * as preRequest from "./preRequest"

export const createBookingBody = {
    firstname : variable.userFirstName,
    lastname : variable.userLastName,
    totalprice :  preRequest.price,
    depositpaid : false,
    bookingdates :
        {
            checkin : preRequest.checkin,
            checkout :preRequest.checkout
        },
    additionalneeds : variable.additionalNeeds
}
