import { INestApplication } from '@nestjs/common'

import { setup } from '../../../../../../test/setup'
import { NationalRegistryUser } from '../../../nationalRegistry'
import { FlightService } from '../../flight.service'
import { FlightDto } from '../../dto'
import { Flight } from '../../flight.model'

let app: INestApplication
let flightService: FlightService

beforeAll(async () => {
  app = await setup()
  flightService = app.get<FlightService>(FlightService)
})

describe('create', () => {
  const flightDto: FlightDto = {
    bookingDate: new Date('2020-08-17T12:35:50.971Z'),
    flightLegs: [
      {
        origin: 'VPN',
        destination: 'AK',
        originalPrice: 50000,
        discountPrice: 30000,
        date: new Date('2021-03-12T12:35:50.971Z'),
      },
      {
        origin: 'AK',
        destination: 'THO',
        originalPrice: 100000,
        discountPrice: 60000,
        date: new Date('2021-03-15T12:35:50.971Z'),
      },
      {
        origin: 'GRY',
        destination: 'GRY',
        originalPrice: 100000,
        discountPrice: 60000,
        date: new Date('2021-03-15T12:35:50.971Z'),
      },
      {
        origin: 'AK',
        destination: 'RVK',
        originalPrice: 100000,
        discountPrice: 60000,
        date: new Date('2021-03-15T12:35:50.971Z'),
      },
    ],
  }
  const user: NationalRegistryUser = {
    nationalId: 'string',
    firstName: 'string',
    middleName: 'string',
    lastName: 'string',
    gender: 'kk',
    address: 'string',
    postalcode: 200,
    city: 'string',
  }

  it('should set the airline as norlandair for first 3 legs, and icelandair for last', async () => {
    const airline = 'icelandair'
    const result = await flightService.create(flightDto, user, airline)

    expect(result.flightLegs.length).toEqual(4)
    expect(result.flightLegs[0].airline).toEqual('norlandair')
    expect(result.flightLegs[1].airline).toEqual('norlandair')
    expect(result.flightLegs[2].airline).toEqual('norlandair')
    expect(result.flightLegs[3].airline).toEqual(airline)
  })

  it('should set the airline as ernir', async () => {
    const airline = 'ernir'
    const result = await flightService.create(flightDto, user, airline)

    expect(result.flightLegs.length).toEqual(4)
    expect(result.flightLegs[0].airline).toEqual(airline)
    expect(result.flightLegs[1].airline).toEqual(airline)
    expect(result.flightLegs[2].airline).toEqual(airline)
    expect(result.flightLegs[3].airline).toEqual(airline)
  })
})
