import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

global.owner = [
  ['', '-', true],
  ['']

]

global.mods = []
global.prems = []
   

global.packname = ``
global.author = ''

global.botname = 'Sylpha - Bot'

global.name_canal = '-'
global.id_canal = '120363274577422945@newsletter'

global.canal = 'https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n'

global.multiplier = 69 
global.maxwarn = '2'
//─────「─────」─────`*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
