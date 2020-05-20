import fetch from 'isomorphic-unfetch'
import { CreateApplicationInput } from '../../../types'
import { environment } from '../../../environments/environment'

const APPLICATION_TYPE = 'gjafakort'

const formatApplication = ({ id, state, data: { email } }) => ({
  id,
  state,
  email,
})

export const createApplication = async (
  application: CreateApplicationInput,
) => {
  const url = `${environment.applicationUrl}/issuers/${application.ssn}/applications`
  const { email } = application

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: APPLICATION_TYPE,
      state: 'approved',
      data: { email },
    }),
  })
  const data = await res.json()
  return formatApplication(data.application)
}

export const getApplication = async (ssn: string) => {
  const url = `${environment.applicationUrl}/issuers/${ssn}/applications/${APPLICATION_TYPE}`

  const res = await fetch(url)
  const data = await res.json()
  return formatApplication(data.application)
}