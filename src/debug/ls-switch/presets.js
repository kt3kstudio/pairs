// Don't require this file from the client side script
// This file is intended for using in bulbofile

const fs = require('fs')
const path = require('path')
const join = path.join

const presets = {}

const PRESETS_DIR = 'presets'

fs.readdirSync(join(__dirname, PRESETS_DIR)).forEach(filename => {
  const name = filename.replace(/\.json$/, '')

  presets[name] = JSON.parse(fs.readFileSync(join(__dirname, PRESETS_DIR, filename)))
})

module.exports = presets
