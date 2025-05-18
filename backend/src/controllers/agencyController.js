const { Agencies } = require("../database/entity/index");

module.exports = {
  // Create a new agency
  async createAgency(req, res) {
    try {
      const agency = await Agencies.create(req.body);
      return res.status(201).json(agency);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all agencies
  async getAllAgencies(req, res) {
    try {
      const agencies = await Agencies.findAll();
      return res.status(200).json(agencies);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get a single agency by ID
  async getAgencyById(req, res) {
    try {
      const agency = await Agencies.findByPk(req.params.id);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }
      return res.status(200).json(agency);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update an agency
  async updateAgency(req, res) {
    try {
      const agency = await Agencies.findByPk(req.params.id);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }
      await agency.update(req.body);
      return res.status(200).json(agency);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete an agency
  async deleteAgency(req, res) {
    try {
      const agency = await Agencies.findByPk(req.params.id);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }
      await agency.destroy();
      return res.status(200).json({ message: "Agency deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
