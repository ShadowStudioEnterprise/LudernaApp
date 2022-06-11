export class DataBooking {

  constructor(
    public dayStart: string,
    public dayEnd: string,
    public adults: number,
    public children: number
  ) {  }

}
export class DataUserBooking {

  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public phone: number
  ) {  }

}
