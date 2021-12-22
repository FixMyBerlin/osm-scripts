import fse from "fs-extra"

export const cleanupOutputFolder = (path: string) => {
  fse.emptyDir(path)
}
