import fs from "fs"

// TODO, does not work yet
export const cleanupDirectory = (directory: string): void => {
  console.log(fs.lstatSync(directory).isDirectory())
  // fs.rmSync(directory, { force: true })
  // if (!fs.existsSync(directory)) {
  //   fs.mkdirSync(directory)
  // }
}
