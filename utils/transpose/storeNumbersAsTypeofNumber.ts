import { Feature } from "../types"

export const storeNumbersAsTypeofNumber = (features: Feature[]) => {
  console.time("⏱ storeNumbersAsTypeofNumber() for property 'population'")

  // This works for one value only, ATM so I don't have to battle TS.
  features.forEach((feature) => {
    if (feature.properties.population === undefined) return
    if (typeof feature.properties.population === "number") return

    const oldValue = feature.properties.population
    const newValue = parseFloat(oldValue)

    feature.properties.population = newValue

    console.log(
      `storeNumbersAsTypeofNumber() transformed ${typeof oldValue} ${oldValue} to ${newValue}`
    )
  })

  console.timeEnd("⏱ storeNumbersAsTypeofNumber() for property 'population'")
}
