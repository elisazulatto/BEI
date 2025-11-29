import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename) //.... /controllers
const urlRoot = join(_dirname, "..", "vistas", "index.html")

export const root = (req, res) => {
    res.sendFile(urlRoot)
};