const sharp = require('sharp')
const fs = require('node:fs')

/**
 *
 * @param {*} fileName
 */
async function resize(fileName) {
  const fileIn = './public/temp/' + fileName
  const fileOut = './public/images/' + fileName.split('.')[0] + '.webp'
  try {
    fs.readFile(fileIn, (err, data) => {
      if (err) {
        return console.error(
          'Error reading file ' + fileIn + ' ' + err.toString()
        )
      }
      sharp(data)
        .resize(null, 536)
        .webp({ quality: 85 })
        .toFile(fileOut, (err) => {
          if (err) {
            return console.error('Error ' + fileOut + ' ' + err.toString())
          }

          fs.unlink(fileIn, (err) => {
            if (err) {
              return console.error(
                'error deleting ' + fileIn + ' ' + err.toString()
              )
            }
          })
        })
    })
  } catch (error) {
    console.error('Rezising error :', error)
  }
}

module.exports = resize
