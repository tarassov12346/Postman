import {randomPrice} from "../utils/randomGenerator"
import {randomDate} from "../utils/randomGenerator"

export const price = randomPrice();
export const priceNew = randomPrice();

export const check = randomDate(new Date(2022, 0, 1), new Date());

export const checkin = check.toISOString().slice(0, 10)
export const checkout = addDays(check,randomIntFromInterval(2,4)).toISOString().slice(0, 10)
export const checkoutNew = addDays(check,randomIntFromInterval(5,8)).toISOString().slice(0, 10)


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }