import {getFirstUser} from "../httpMethods/getFirstUser";
import {getTheSecondUser} from "../httpMethods/getTheSecondUser";
import {createBooking} from "../httpMethods/createBooking";
import {createBookingBody} from "../bodyStruture/createBookingBody";

import {auth} from "../httpMethods/auth";
import {authBody} from "../bodyStruture/authBody";
import {getAllBookings} from "../httpMethods/getAllBookings";
import {getInfoAboutUserViaID} from "../httpMethods/getInfoAboutUserViaID";

import {updateUserBooking} from "../httpMethods/updateUserBooking";
import {updateUserBookingBody} from "../bodyStruture/updateUserBookingBody";

import {updatePatch} from "../httpMethods/updatePatch";
import {updatePatchBody} from "../bodyStruture/updatePatchBody";

import {deleteUserBooking} from "../httpMethods/deleteUserBooking";

import {tryDeletedInfo} from "../httpMethods/tryDeletedInfo";


import {content} from "../utils/globalVariables";



import * as requestData from "../bodyStruture/preRequest"

import * as bodyData from "../bodyStruture/createBookingBody"
import * as updateBodyData from "../bodyStruture/updateUserBookingBody"
import * as updatePatchData from "../bodyStruture/updatePatchBody"


import ("jest-matcher-one-of"); // it's to for one-of method

export let gender;
export let nat;
export let bookingId;
export let token;

describe("get first user", ()=>{
    let response;

    beforeAll( async () =>{

            response = await getFirstUser()
            console.log("response:", response.data)

    })

    afterAll( async ()=> {
        gender = response.data.results[0].gender;
        console.log("gender is:", gender);
        nat = response.data.results[0].nat;
        console.log("nat is:", nat);

    })
test("status code is 200", async () => {
    await expect(response.status).toEqual(200);
});
    test("status text is OK", async () =>{
        await expect(response.statusText).toEqual("OK")
    });
    test("compare the gender in response", async () => {
        await expect(response.data.results[0].gender).toBeOneOf(["female","male"]);
    })
})



describe("get user with predefined parameters", () => {
    let response

    beforeAll(async () => {
        response = await getTheSecondUser();
        console.log("response is:", response.data)
    })

    test("status code is 200", async() => {
        await expect(response.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(response.statusText).toEqual("OK")
    });

    test("gender is equal expected value", async () =>{
        await expect(response.data.results[0].gender).toEqual(gender)
    })

    test("nat is equal expected value", async () =>{
        await expect(response.data.results[0].nat).toEqual(nat)
    })
})

describe("example authentificate", () => {
    let bookingResponse;

    beforeAll(async () => {
        bookingResponse = await auth(authBody,content);
        token=bookingResponse.data.token;
        console.log("token is:", token)
    })

    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

})

describe("example get all bookings", () => {
    let bookingResponse;

    beforeAll(async () => {
        bookingResponse = await getAllBookings();
    })

    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

})



describe("example create a booking", () => {
    let bookingResponse;

    beforeAll(async () => {
        bookingResponse = await createBooking(createBookingBody,content);
        console.log("bookingResponse is:", bookingResponse.data)
    })

    afterAll(async () =>{
        bookingId = bookingResponse.data.bookingid;
        console.log("response bookingid is:", bookingId)
    })
    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

    test("checkin date is equal expected value", async () => {
        await expect(bookingResponse.data.booking.bookingdates.checkin).toEqual("2022-11-29")
    })

    test("price in response is equal generated value", async () => {
        await expect(bookingResponse.data.booking.totalprice).toEqual(requestData.price)
    })
})

describe("example getInfoAboutUserViaId", () => {
    let bookingResponse;

    beforeAll(async () => {
        
        bookingResponse = await getInfoAboutUserViaID(content);
    })

    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

    test("User firstname is the same", async () =>{
        console.log("INFO",bookingResponse.data)
        console.log("SCREEN:",bookingResponse.data.firstname)
        console.log("BODY",bodyData.createBookingBody.firstname)
        await expect(bookingResponse.data.firstname).toEqual(bodyData.createBookingBody.firstname)
    });

    test("User lastname is the same", async () =>{
        await expect(bookingResponse.data.lastname).toEqual(bodyData.createBookingBody.lastname)
    });

    test("User price is the same", async () =>{
        await expect(bookingResponse.data.totalprice).toEqual(bodyData.createBookingBody.totalprice)
    });

    test("User depositpaid is the same", async () =>{
        await expect(bookingResponse.data.depositpaid).toEqual(bodyData.createBookingBody.depositpaid)
    });

    test("User checkindate is the same", async () =>{
        
        await expect(bookingResponse.data.bookingdates.checkin).toEqual(bodyData.createBookingBody.bookingdates.checkin)
    });

    test("User checkoutdate is the same", async () =>{
        
        await expect(bookingResponse.data.bookingdates.checkout).toEqual(bodyData.createBookingBody.bookingdates.checkout)
    });

    test("User additionalneeds is the same", async () =>{
        await expect(bookingResponse.data.additionalneeds).toEqual(bodyData.createBookingBody.additionalneeds)
    });

})

describe("example updateUserBooking", () => {
    let bookingResponse;

    beforeAll(async () => {       
        bookingResponse = await updateUserBooking(updateUserBookingBody,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              "Cookie": `token=${token}`,
              "Authorisation": "Basic"
            },
          });
        console.log("UPDATED!!!!!!!",bookingResponse.data )

    })

    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

    test("User price is the same", async () =>{
        await expect(bookingResponse.data.totalprice).toEqual(updateBodyData.updateUserBookingBody.totalprice)
    });

    test("User checkoutdate is the same", async () =>{       
        await expect(bookingResponse.data.bookingdates.checkout).toEqual(updateBodyData.updateUserBookingBody.bookingdates.checkout)
    });
})

describe("example updatePatch", () => {
    let bookingResponse;

    beforeAll(async () => {       
        bookingResponse = await updatePatch(updatePatchBody,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              "Cookie": `token=${token}`,
              "Authorisation": "Basic"
            },
          });
        console.log("PATCH-UPDATED!!!!!!!",bookingResponse.data )

    })

    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })

    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });

    test("User depositpaid is the same", async () =>{
        await expect(bookingResponse.data.depositpaid).toEqual(updatePatchData.updatePatchBody.depositpaid)
    });

    test("User additionalneeds is the same", async () =>{       
        await expect(bookingResponse.data.additionalneeds).toEqual(updatePatchData.updatePatchBody.additionalneeds)
    });
})

describe("example deleteUserBooking", () => {
    let bookingResponse;

    beforeAll(async () => {       
        bookingResponse = await deleteUserBooking({
            headers: {
                "Content-Type": "application/json",
              "Cookie": `token=${token}`,
            },
          });
        console.log("DELETED!!!!!!!",bookingResponse.data )

    })

    test("status code is 201", async() => {
        await expect(bookingResponse.status).toEqual(201)
    })

    test("status text is Created", async () =>{
        await expect(bookingResponse.statusText).toEqual("Created")
    });
})

describe("example tryDeletedInfo", () => {
    
    let bookingResponse;
    let statusCode;
    let statusText;

        beforeAll(async () => {
           try {bookingResponse = await tryDeletedInfo(content);}
           catch(err){
            console.log(err.response.statusText)
            statusCode=err.response.status;
            statusText=err.response.statusText;
        
        }
            
        })
    
        test("status code is 404", async() => {
           await expect(statusCode).toEqual(404);
            
        })
        
    

    test("status text is Not Found", async () =>{
        await expect(statusText).toEqual("Not Found")
    });

    
})



