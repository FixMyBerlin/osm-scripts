import fs from "fs"
import { Feature } from "../types"

export const mergeFiles = (fileList: string[]): Feature[] | [] => {
  const features = []

  fileList.map((file) => {
    console.time(`⏱ merge/forEach ${file}`)
    const data = JSON.parse(fs.readFileSync(file, { encoding: "utf8" }))

    data.features.map((feature) => features.push(feature))
    console.timeEnd(`⏱ merge/forEach ${file}`)
  })

  return features
}
