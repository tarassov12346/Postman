export function randomPrice(){
    return Math.floor(Math.random()*100) +1;
}

export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
