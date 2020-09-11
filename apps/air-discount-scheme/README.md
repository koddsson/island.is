# Air Discount Scheme - Loftbru

## About

Generates discount codes that can be used for booking domestic flights online.

There are certain precondition to be eligible for a discount. They are:

- The person's legal domicile needs to be in a predefined set of towns outside
  the capital.

## Project structure

The system has a frontend that is used for people to get their discount code.

It also has an api used by the airlines to verify the discount code validity.

## Shortcuts

There were shortcuts taken that can be improved:

- The authentication is pretty primitive, the IDP is still in development at
  the time of this writing so we needed to use static api keys.
- The deployment pipeline is outside of the islandis main pipeline. We needed
  to do this because of the tight timeline for this project.

## Integrations

- Þjóðskrá: The authentication service only gives us access to a persons
  kennitala and mobile number when they login with their phone.
  So we needed to integrate with the national registry to fetch their
  legal domicile and match their postal codes.

## Development

To get started developing this project, go ahead and:

1. Fetch the environment secrets: `yarn env-secrets air-discount-scheme --reset`
2. Start the resources with docker-compose: `docker-compose -f backend/docker-compose.base.yml -f backend/docker-compose.dev.yml up`
3. Start the front end: `yarn start air-discount-scheme-web`
4. Start the graphql api: `yarn start air-discount-scheme-api`
5. Start the backend api: `yarn start air-discount-scheme-backend`

Navigate to `localhost:4200` for the website or `localhost:4248/api/swagger/` for the airline api.

## Maintainers

barabrian - Brian
dabbeg - Davíð Guðni
darrikonn - Darri Steinn
