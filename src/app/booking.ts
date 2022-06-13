export class DataBooking {

  constructor(
    public dayStart: string,
    public dayEnd: string,
    public adults: number,
    public children: number
  ) { }

}
export class DataUserBooking {

  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public phone: number
  ) { }

}
export class DataPlaceBooking {

  constructor(
    public name: string,
    public town: string,
    public location: string,
  ) { }

}

export class Booking {
  constructor(
    public dataUser: DataUserBooking,
    public data: DataBooking,
    public place:DataPlaceBooking,
    public prize: Number
    ) { }
}
