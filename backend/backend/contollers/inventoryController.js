const Medicine = require('../models/invetory');
const { spawn } = require('child_process');
const path = require('path');


exports.getInventory = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addMedicine = async (req, res) => {
  try {
    const {
      name,
      stock,
      expiry_date,
      mfg_date,
      shelf_life_months,
      price
    } = req.body;

    const med = new Medicine({
      name,
      stock,
      expiry_date: expiry_date ? new Date(expiry_date) : undefined,
      mfg_date: mfg_date ? new Date(mfg_date) : undefined,
      shelf_life_months,
      price
    });

    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        expiry_date: req.body.expiry_date ? new Date(req.body.expiry_date) : undefined,
        mfg_date: req.body.mfg_date ? new Date(req.body.mfg_date) : undefined,
        price: req.body.price ? parseFloat(req.body.price) : undefined
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.predictExpiry = (req, res) => {
  const { name, mfg_date, shelf_life_months } = req.body;

  const py = spawn('python', [
    path.join(__dirname, '../python/expiry_predictor.py'),
    name,
    mfg_date,
    shelf_life_months
  ]);

  py.stdout.on('data', data => {
    res.json({ predicted_expiry: data.toString().trim() });
  });

  py.stderr.on('data', err => {
    res.status(500).send(err.toString());
  });
};



