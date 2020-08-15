import Joi from '@hapi/joi';
export const validate = (obj) => {
  const schema = Joi.object({
    startDate: Joi.string()
        .min(10)
        .max(10)
        .required(),

        endDate: Joi.string()
        .min(10)
        .max(10)
        .required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required()
      })
      const result = schema.validate(obj);
      return result;

}