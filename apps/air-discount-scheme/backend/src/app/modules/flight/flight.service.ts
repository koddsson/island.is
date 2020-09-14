import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as kennitala from 'kennitala'

import { Airlines, States } from '@island.is/air-discount-scheme/consts'
import { FlightLegSummary } from './flight.types'
import { Flight, FlightLeg, financialStateMachine } from './flight.model'
import { FlightDto, FlightLegDto, GetFlightsBody } from './dto'
import { NationalRegistryUser } from '../nationalRegistry'

export const ADS_POSTAL_CODES = {
  Reykhólahreppur: 380,
  // from Reykhólahreppur to Þingeyri
  Þingeyri: 471,

  Hólmavík: 510,
  // from Hólmavík to Öræfi
  Öræfi: 785,

  Vestmannaeyjar: 900,
}
const DEFAULT_AVAILABLE_LEGS = 6
const AVAILABLE_FLIGHT_LEGS = {
  '2020': 2,
  '2021': 6,
}
export const NORLANDAIR_FLIGHTS = ['VPN', 'THO', 'GRY']

const availableFinancialStates = [
  financialStateMachine.states[States.awaitingDebit].key,
  financialStateMachine.states[States.sentDebit].key,
]

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight)
    private flightModel: typeof Flight,
    @InjectModel(FlightLeg)
    private flightLegModel: typeof FlightLeg,
  ) {}

  isADSPostalCode(postalcode: number): boolean {
    if (
      postalcode >= ADS_POSTAL_CODES['Reykhólahreppur'] &&
      postalcode <= ADS_POSTAL_CODES['Þingeyri']
    ) {
      return true
    } else if (
      postalcode >= ADS_POSTAL_CODES['Hólmavík'] &&
      postalcode <= ADS_POSTAL_CODES['Öræfi']
    ) {
      return true
    } else if (postalcode === ADS_POSTAL_CODES['Vestmannaeyjar']) {
      return true
    }
    return false
  }

  private getAirline(
    flightLeg: FlightLegDto,
    airline: ValueOf<typeof Airlines>,
  ): ValueOf<typeof Airlines> {
    if (airline === Airlines.icelandair) {
      if (
        NORLANDAIR_FLIGHTS.includes(flightLeg.destination) ||
        NORLANDAIR_FLIGHTS.includes(flightLeg.origin)
      ) {
        return Airlines.norlandair
      }
    }

    return airline
  }

  async countFlightLegsByNationalId(
    nationalId: string,
  ): Promise<FlightLegSummary> {
    const currentYear = new Date(Date.now()).getFullYear().toString()
    let availableLegsThisYear = DEFAULT_AVAILABLE_LEGS
    if (Object.keys(AVAILABLE_FLIGHT_LEGS).includes(currentYear)) {
      availableLegsThisYear = AVAILABLE_FLIGHT_LEGS[currentYear]
    }

    const noFlightLegs = await this.flightModel.count({
      where: { nationalId },
      include: [
        {
          model: this.flightLegModel,
          where: { financialState: availableFinancialStates },
        },
      ],
    })
    return {
      used: noFlightLegs,
      unused: availableLegsThisYear - noFlightLegs,
      total: availableLegsThisYear,
    }
  }

  findAll(): Promise<Flight[]> {
    return this.flightModel.findAll({
      include: [
        {
          model: this.flightLegModel,
          where: { financialState: availableFinancialStates },
        },
      ],
    })
  }

  findAllByFilter(body: GetFlightsBody | any): Promise<Flight[]> {
    return this.flightModel.findAll({
      where: {
        ...(body.period
          ? {
              bookingDate: { '&gte': body.period.from, '&lte': body.period.to },
            }
          : {}),
        ...(body.age
          ? {
              'userInfo.age': { '&gte': body.age.from, '&lte': body.age.to },
            }
          : {}),
        ...(body.gender ? { 'userInfo.gender': body.gender } : {}),
        ...(body.postalCode ? { 'userInfo.postalCode': body.postalCode } : {}),
      },
      include: [
        {
          model: this.flightLegModel,
          where: {
            ...(body.airline ? { airline: body.airline } : {}),
            ...(body.state ? { financialState: body.state } : {}),
            ...(body.flightLeg ? { origin: body.flightLeg.from } : {}),
            ...(body.flightLeg ? { destination: body.flightLeg.to } : {}),
          },
        },
      ],
    })
  }

  async findAllByNationalId(nationalId: string): Promise<Flight[]> {
    return this.flightModel.findAll({
      where: { nationalId },
      include: [
        {
          model: this.flightLegModel,
          where: { financialState: availableFinancialStates },
        },
      ],
    })
  }

  async create(
    flight: FlightDto,
    user: NationalRegistryUser,
    airline: string,
  ): Promise<Flight> {
    const nationalId = user.nationalId
    return this.flightModel.create(
      {
        ...flight,
        flightLegs: flight.flightLegs.map((flightLeg) => ({
          ...flightLeg,
          airline: this.getAirline(flightLeg, airline),
        })),
        nationalId,
        userInfo: {
          age: kennitala.info(nationalId).age,
          gender: user.gender,
          postalCode: user.postalcode,
        },
      },
      { include: [this.flightLegModel] },
    )
  }

  async findOne(flightId: string, airline: string): Promise<Flight> {
    return this.flightModel.findOne({
      where: {
        id: flightId,
      },
      include: [
        {
          model: this.flightLegModel,
          where: {
            financialState: availableFinancialStates,
            airline:
              airline === Airlines.icelandair
                ? [Airlines.icelandair, Airlines.norlandair]
                : airline,
          },
        },
      ],
    })
  }

  delete(flight: Flight): Promise<FlightLeg[]> {
    return Promise.all(
      flight.flightLegs.map((flightLeg) => {
        const financialState = financialStateMachine
          .transition(flightLeg.financialState, 'REVOKE')
          .value.toString()
        return flightLeg.update({ financialState })
      }),
    )
  }

  async deleteFlightLeg(flightLeg: FlightLeg): Promise<FlightLeg> {
    const financialState = financialStateMachine
      .transition(flightLeg.financialState, 'REVOKE')
      .value.toString()
    return flightLeg.update({ financialState })
  }
}
