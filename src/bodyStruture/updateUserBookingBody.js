import * as variable from "../utils/globalVariables"
import * as preRequest from "./preRequest"

export const updateUserBookingBody = {
    firstname : variable.userFirstName,
    lastname : variable.userLastName,
    totalprice :  preRequest.priceNew,
    depositpaid : false,
    bookingdates :
        {
            checkin : preRequest.checkin,
            checkout :preRequest.checkoutNew
        },
    additionalneeds : variable.additionalNeeds
}
