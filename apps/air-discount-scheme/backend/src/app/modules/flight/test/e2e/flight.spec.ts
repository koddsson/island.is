import { setup } from '../../../../../../test/setup'
import * as request from 'supertest'
import { INestApplication, CACHE_MANAGER } from '@nestjs/common'
import CacheManger from 'cache-manager'
import {
  NationalRegistryService,
  NationalRegistryUser,
} from '../../../nationalRegistry'

let app: INestApplication
let cacheManager: CacheManger
let nationalRegistryService: NationalRegistryService
const user: NationalRegistryUser = {
  nationalId: '1234567890',
  firstName: 'Jón',
  gender: 'kk',
  lastName: 'Jónsson',
  middleName: 'Gunnar',
  address: 'Bessastaðir 1',
  postalcode: 900,
  city: 'Vestmannaeyjar',
}

beforeAll(async () => {
  app = await setup()
  cacheManager = app.get<CacheManger>(CACHE_MANAGER)
  cacheManager.ttl = () => ''
  nationalRegistryService = app.get<NationalRegistryService>(
    NationalRegistryService,
  )
  jest
    .spyOn(nationalRegistryService, 'getUser')
    .mockImplementation(() => Promise.resolve(user))
})

describe('Create Flight', () => {
  it(`POST /api/public/discounts/:discountCode/flights should create a flight`, async () => {
    const spy = jest
      .spyOn(cacheManager, 'get')
      .mockImplementation(() => ({ nationalId: user.nationalId }))
    const response = await request(app.getHttpServer())
      .post('/api/public/discounts/12345678/flights')
      .set('Authorization', 'Bearer ernir')
      .send({
        bookingDate: '2020-08-17T12:35:50.971Z',
        flightLegs: [
          {
            origin: 'REK',
            destination: 'AK',
            originalPrice: 50000,
            discountPrice: 30000,
            date: '2021-03-12T12:35:50.971Z',
          },
          {
            origin: 'AK',
            destination: 'REK',
            originalPrice: 100000,
            discountPrice: 60000,
            date: '2021-03-15T12:35:50.971Z',
          },
        ],
      })
      .expect(201)

    expect(response.body).toEqual({
      id: expect.any(String),
      created: expect.any(String),
      modified: expect.any(String),
      nationalId: user.nationalId,
      bookingDate: '2020-08-17T12:35:50.971Z',
      flightLegs: [
        {
          id: expect.any(String),
          flightId: expect.any(String),
          date: '2021-03-12T12:35:50.971Z',
          destination: 'AK',
          airline: 'ernir',
          discountPrice: 30000,
          financialState: 'AWAITING_DEBIT',
          origin: 'REK',
          originalPrice: 50000,
          created: expect.any(String),
          modified: expect.any(String),
        },
        {
          id: expect.any(String),
          flightId: expect.any(String),
          date: '2021-03-15T12:35:50.971Z',
          destination: 'REK',
          airline: 'ernir',
          discountPrice: 60000,
          financialState: 'AWAITING_DEBIT',
          origin: 'AK',
          originalPrice: 100000,
          created: expect.any(String),
          modified: expect.any(String),
        },
      ],
    })

    spy.mockRestore()
  })

  it('POST /api/public/discounts/:discountCode/flights should return bad request when flightLegs are omitted', async () => {
    await request(app.getHttpServer())
      .post('/api/public/discounts/12345678/flights')
      .set('Authorization', 'Bearer ernir')
      .send({
        nationalId: user.nationalId,
        bookingDate: '2020-08-17T12:35:50.971Z',
      })
      .expect(400)
  })
})

describe('Delete Flight', () => {
  it(`DELETE /api/public/flights/:flightId should delete a flight`, async () => {
    const spy = jest
      .spyOn(cacheManager, 'get')
      .mockImplementation(() => ({ nationalId: user.nationalId }))
    const createRes = await request(app.getHttpServer())
      .post('/api/public/discounts/12345678/flights')
      .set('Authorization', 'Bearer icelandair')
      .send({
        bookingDate: '2020-08-17T12:35:50.971Z',
        flightLegs: [
          {
            origin: 'REK',
            destination: 'AK',
            originalPrice: 50000,
            discountPrice: 30000,
            date: '2021-03-12T12:35:50.971Z',
          },
          {
            origin: 'AK',
            destination: 'REK',
            originalPrice: 100000,
            discountPrice: 60000,
            date: '2021-03-15T12:35:50.971Z',
          },
        ],
      })
      .expect(201)
    spy.mockRestore()

    await request(app.getHttpServer())
      .delete(`/api/public/flights/${createRes.body.id}`)
      .set('Authorization', 'Bearer icelandair')
      .expect(204)

    const getRes = await request(app.getHttpServer())
      .get(`/api/private/flights`)
      .expect(200)

    expect(getRes.body.length).toBe(0)
  })

  it(`DELETE /api/public/flights/:flightId should validate flightId`, async () => {
    await request(app.getHttpServer())
      .delete('/api/public/flights/this-is-not-uuid')
      .set('Authorization', 'Bearer ernir')
      .expect(400)
  })

  it(`DELETE /api/public/flights/:flightId should return not found if flight does not exist`, async () => {
    await request(app.getHttpServer())
      .delete('/api/public/flights/dfac526d-5dc0-4748-b858-3d9cd2ae45be')
      .set('Authorization', 'Bearer ernir')
      .expect(404)
  })

  it(`DELETE /api/public/flights/:flightId/flightLegs/:flightLegId should delete a flightLeg`, async () => {
    // Arrange
    const spy = jest
      .spyOn(cacheManager, 'get')
      .mockImplementation(() => ({ nationalId: user.nationalId }))
    const createRes = await request(app.getHttpServer())
      .post('/api/public/discounts/12345678/flights')
      .set('Authorization', 'Bearer icelandair')
      .send({
        bookingDate: '2020-08-17T12:35:50.971Z',
        flightLegs: [
          {
            origin: 'REK',
            destination: 'AK',
            originalPrice: 50000,
            discountPrice: 30000,
            date: '2021-03-12T12:35:50.971Z',
          },
          {
            origin: 'AK',
            destination: 'REK',
            originalPrice: 100000,
            discountPrice: 60000,
            date: '2021-03-15T12:35:50.971Z',
          },
        ],
      })
      .expect(201)
    spy.mockRestore()
    expect(createRes.body.flightLegs.length).toBe(2)

    // Act
    await request(app.getHttpServer())
      .delete(
        `/api/public/flights/${createRes.body.id}/flightLegs/${createRes.body.flightLegs[0].id}`,
      )
      .set('Authorization', 'Bearer icelandair')
      .expect(204)

    // Assert
    const getRes = await request(app.getHttpServer()).get(
      `/api/private/flights`,
    )
    expect(
      getRes.body.find((flight) => flight.id === createRes.body.id).flightLegs
        .length,
    ).toBe(1)
  })
})
