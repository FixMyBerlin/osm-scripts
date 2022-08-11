import { Feature } from "../types"

const processingDateCreatedAt = new Date()
  .toISOString()
  .slice(0, 16)
  .replace("T", " ")

export const processingDateProperty = {
  "FMC:DataCreatedAndProcessedAt": `${processingDateCreatedAt}`,
} as Feature["properties"]

export const addProcessingDateProperty = (features: Feature[]) => {
  console.time("⏱ addProcessingDateProperty()")

  features.forEach((feature) => {
    feature.properties = { ...feature.properties, ...processingDateProperty }
  })

  console.timeEnd("⏱ addProcessingDateProperty()")
}
