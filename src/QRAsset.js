const util = require('./util');

const QRASSET_SCHEMA = {
  assetData: {
    qr_code: String,
  },
  metaData: {
    intake_date: Date,
    batch_id: String,
    client: String,
    product_type: String,
    weight_kg: Number,
  },
};

const validateAssetData = (assetData) => {
  // return util.validateData(assetData, QRASSET_SCHEMA.assetData);
  return true;
};

const validateMetaData = (metaData) => {
  // return util.validateData(metaData, QRASSET_SCHEMA.metaData);
  return true;
};

const validateOutput = (output) => {
  return true;
};

class QRAsset {
  constructor(assetData, metaData, output) {
    this.data = [assetData, metaData, output];
  }

  get assetData() {
    return this.data[0];
  }

  set assetData(assetData) {
    const isValid = validateAssetData(assetData);
    if (isValid) {
      this.data[0] = assetData;
      return true;
    }
    return false;
  }

  get metaData() {
    return this.data[1];
  }

  set metaData(metaData) {
    const isValid = validateMetaData(metaData);
    if (isValid) {
      this.data[1] = metaData;
      return true;
    }
    return false;
  }

  get output() {
    return this.data[2];
  }

  set output(output) {
    const isValid = validateOutput(output);
    if (isValid) {
      this.data[2] = output;
      return true;
    }
    return false;
  }
}

module.exports = QRAsset;
