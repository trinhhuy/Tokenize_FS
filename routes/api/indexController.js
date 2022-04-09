'use strict'
/** @class IndexController
 * */
const IndexService = require('../util/IndexService')

function IndexController() {
  return {
    /** @memberOf IndexController
     * @description get data for home */
    getData:async (req, res) => {
      let data = await IndexService.getDataOrder()
      return res.json({
        s: 200,
        data: data
      })
    }
  }
}


module.exports = new IndexController()