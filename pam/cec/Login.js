/*
 * Copyright (C) 2017 Dolf Dijkstra
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

const request = require('request')
const jar = request.jar()

const auth = ctx =>
  'Basic ' +
  Buffer.from(ctx.domain + '.' + ctx.user + ':' + ctx.password).toString(
    'base64'
  )

  const obrareq302 = (ctx, cb) => (error, response, body) => {
    if (error) {
      throw new Error(error)
    }
    console.log('in obrareq');
    // this next call will redirect two more times, but now we can have request handle it.
    if(response.headers.location!==undefined) {
      let options = {
        method: 'GET',
        url: response.headers.location,
        followRedirect: true,
        jar: jar,
        headers: {
          Authorization: auth(ctx), // OAM has a non-compliant bug: headers are case-sensitive
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
      request(options, cb);
    } else {
      cb(error, response, body);
    }
  }


const login = (ctx, cb) => {
  var options = {
    method: 'GET',
    url: ctx.host + '/content/management/api/v1/dataTypes',
    followRedirect: false,
    jar: jar,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  request(options, obrareq302(ctx, cb))
}

module.exports = ctx => {
  return new Promise((resolve, reject) => {
    login(ctx, (error, response, body) => {
      if (error) return reject(error)
      if (response.statusCode >= 400)
        return reject(new Error('Invalid username/password'))
      return resolve(jar)
    })
  })
}
