const queries = {
  /**
   * Get all the data from the storage
   *
   * @param {*} model
   * @param {*} query
   * @param {*} projection
   * @param {*} options
   * @returns
   */
  getData: async (model, query, projection, options) => {
    return model.find(query, projection, options)
  },

  /**
   * Find one data from the storage
   *
   * @param {*} model
   * @param {*} query
   * @param {*} projection
   * @param {*} options
   * @returns
   */
  findOne: async (model, query, projection, options) => {
    return model.findOne(query, projection, options)
  },

  /**
   * Create entry into storage
   *
   * @param {*} model
   * @param {*} data
   * @returns
   */
  create: async (model, data) => {
    return new model(data).save()
  },

  /**
   * Populate data from the storage
   *
   * @param {*} model
   * @param {*} query
   * @param {*} projection
   * @param {*} options
   * @param {*} collectionOptions
   * @returns
   */
  populateData: (model, query, projection, options, collectionOptions) => {
    return model
      .find(query, projection, options)
      .populate(collectionOptions)
      .exec()
  },

  /**
   * Aggregate data with populate from the storage
   *
   * @param {*} model
   * @param {*} aggregateArray
   * @param {*} populateOptions
   * @returns
   */
  aggregateDataWithPopulate: (model, aggregateArray, populateOptions) => {
    return new Promise((resolve, reject) => {
      model.aggregate(aggregateArray, (err, data) => {
        if (err) {
          reject(err)
        }
        model.populate(data, populateOptions, function (err, populatedDocs) {
          if (err) reject(err)
          resolve(populatedDocs)
        })
      })
    })
  },

  /**
   * Count document from the storage
   *
   * @param {*} model
   * @param {*} condition
   * @returns
   */
  countDocuments: (model, condition) => {
    return model.countDocuments(condition)
  },

  /**
   * Find and update details into storage
   *
   * @param {*} model
   * @param {*} conditions
   * @param {*} update
   * @param {*} options
   * @returns
   */
  findAndUpdate: (model, conditions, update, options) => {
    return model.findOneAndUpdate(conditions, update, options)
  },

  /**
   * Aggregate data from the storage
   *
   * @param {*} model
   * @param {*} aggregateArray
   * @param {*} options
   * @returns
   */
  aggregateData: (model, aggregateArray, options) => {
    let aggregation = model.aggregate(aggregateArray)

    if (options) {
      aggregation.options = options
    }

    return aggregation.exec()
  },
}

module.exports = queries
