import * as _ from 'lodash';

export class Model {

  constructor(config?) {
    if (config) {
      _.assign(this, config);
    }
  }

  update(data) {

    _.forEach(data, (c, key) => {

      if (_.isArray(c.value)) {
        data[key] = c.value[0];
      } else {
        data[key] = c.value;
      }

    });

    _.assign(this, data);
  }

}
