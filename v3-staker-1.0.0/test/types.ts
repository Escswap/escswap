/// <reference path="./matchers/beWithin.ts"/>

import { createFixtureLoader } from './shared/provider'
import { EscswapFixtureType } from './shared/fixtures'

export type LoadFixtureFunction = ReturnType<typeof createFixtureLoader>

export type TestContext = EscswapFixtureType & {
  subject?: Function
}
