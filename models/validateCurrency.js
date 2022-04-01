const Joi = require('joi');

const validateCurrency = (watchedcurrency) => {
    let schema = Joi.object(        {
            currencySymbol: Joi.string().min(2).max(10).required(),
            threshold: Joi.number().required()
        }
    )

    return schema.validate(watchedcurrency);
};

exports.validateCurrency = validateCurrency