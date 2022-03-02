import { Feature } from "../types"

export const addFilenameProperty = (
  features: Feature[],
  fileNamePart: string
) => {
  console.time("addFilenameProperty()")

  features.forEach((feature) => {
    feature.properties["FMC:Filename"] = fileNamePart
  })

  console.timeEnd("addFilenameProperty()")
}
