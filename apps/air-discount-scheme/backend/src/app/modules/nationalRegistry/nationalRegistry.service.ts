import { Inject, Injectable, CACHE_MANAGER, HttpService } from '@nestjs/common'
import CacheManager from 'cache-manager'

import {
  NationalRegistryResponse,
  NationalRegistryUser,
} from './nationalRegistry.types'
import { environment } from '../../../environments'

const { nationalRegistry } = environment
const ONE_MONTH = 2592000 // seconds
const CACHE_KEY = 'nationalRegistry_user'

@Injectable()
export class NationalRegistryService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager,
  ) {}

  private getCacheKey(nationalId: string): string {
    return `${CACHE_KEY}_${nationalId}`
  }

  private createNationalRegistryUser(
    response: NationalRegistryResponse,
  ): NationalRegistryUser {
    if (!response) {
      return null
    }

    const parts = response.name.split(' ')
    return {
      nationalId: response.ssn,
      firstName: parts[0] || '',
      middleName: parts.slice(1, -1).join(' '),
      lastName: parts.slice(-1).pop() || '',
      gender: response.gender,
      address: response.address,
      postalcode: response.postalcode,
      city: response.city,
    }
  }

  async getUser(nationalId: string): Promise<NationalRegistryUser> {
    const cacheKey = this.getCacheKey(nationalId)
    const cacheValue = await this.cacheManager.get(cacheKey)
    if (cacheValue) {
      return cacheValue.user
    }

    const response = await this.httpService
      .get(`${nationalRegistry.url}/general-lookup?ssn=${nationalId}`)
      .toPromise()

    const user = this.createNationalRegistryUser(response.data[0])
    if (user) {
      await this.cacheManager.set(cacheKey, { user }, { ttl: ONE_MONTH })
    }

    return user
  }
}