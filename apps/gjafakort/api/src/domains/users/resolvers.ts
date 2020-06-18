import { ApolloError, UserInputError } from 'apollo-server-express'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { authorize } from '../auth'
import * as userService from './service'
import { CreateUserApplicationInput } from '../../types'

const validateMobile = (mobile: string) => {
  if (!mobile) {
    throw new UserInputError('Mobile number is required')
  }
  const phone = parsePhoneNumberFromString(mobile, 'IS')
  if (!phone.isValid()) {
    throw new UserInputError('Mobile number is invalid')
  }
  return {
    mobileNumber: phone.nationalNumber.toString(),
    countryCode: phone.countryCallingCode.toString(),
  }
}

class UserResolver {
  @authorize({ role: 'tester' })
  public async getUserApplication(
    _1,
    _2,
    { user, dataSources: { applicationApi } },
  ) {
    let application = await userService.getApplication(user.ssn, applicationApi)
    if (!application) {
      return null
    }
    if (!application.data.verified && user.mobile) {
      const { mobileNumber, countryCode } = validateMobile(user.mobile)
      if (
        mobileNumber === application.data.mobileNumber &&
        countryCode === application.data.countryCode
      ) {
        const verified = true
        application = await userService.updateApplication(
          application.id,
          user.ssn,
          verified,
          applicationApi,
        )
      }
    }
    return {
      id: application.id,
      mobileNumber: application.data.mobileNumber,
      countryCode: application.data.countryCode,
    }
  }

  @authorize({ role: 'tester' })
  public async createUserApplication(
    _1,
    { input }: { input: CreateUserApplicationInput },
    { user, dataSources: { applicationApi } },
  ) {
    const mobile = user.mobile || input.mobile
    const verified = Boolean(user.mobile)
    const { mobileNumber, countryCode } = validateMobile(mobile)
    const application = await userService.createApplication(
      user.ssn,
      mobileNumber,
      countryCode,
      verified,
      applicationApi,
    )

    return {
      application: {
        id: application.id,
        mobileNumber: application.data.mobileNumber,
        countryCode: application.data.countryCode,
      },
    }
  }

  @authorize({ role: 'tester' })
  public async getGiftCards(
    _1,
    _2,
    { user, dataSources: { applicationApi, yayApi } },
  ) {
    const application = await userService.getApplication(
      user.ssn,
      applicationApi,
    )
    if (!application) {
      return []
    }
    const {
      data: { mobileNumber, countryCode },
    } = application
    let giftCards = await yayApi.getGiftCards(mobileNumber, countryCode)
    if (!application.data.verified) {
      giftCards = giftCards.filter(
        (giftCard) => giftCard.identifier === application.id,
      )
    }
    return giftCards.map((giftCard) => ({
      giftCardId: giftCard.giftCardId,
      amount: giftCard.amount,
      applicationId: giftCard.identifier,
    }))
  }

  @authorize({ role: 'tester' })
  public async getGiftCardCode(
    _1,
    args,
    { user, dataSources: { applicationApi, yayApi } },
  ) {
    const application = await userService.getApplication(
      user.ssn,
      applicationApi,
    )
    if (!application) {
      return null
    }

    const {
      data: { mobileNumber, countryCode },
    } = application
    const giftCardCode = await yayApi.getGiftCardCode(
      args.giftCardId,
      mobileNumber,
      countryCode,
    )

    return {
      code: giftCardCode.code,
      expiryDate: giftCardCode.expiryDate,
      pollingUrl: giftCardCode.pollingUrl,
    }
  }
}

const resolver = new UserResolver()
export default {
  Query: {
    giftCardCode: resolver.getGiftCardCode,
    giftCards: resolver.getGiftCards,
    userApplication: resolver.getUserApplication,
  },
  Mutation: {
    createUserApplication: resolver.createUserApplication,
  },
}
