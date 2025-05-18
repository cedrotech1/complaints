const { Replies, Users, Claims } = require("../database/entity/index");

// ClaimController.js
import {

  updateOneclaim,
 
  
} from "../services/ClaimsService";
module.exports = {
  // Create a reply to a claim
  async createReply(req, res) {
    try {
        let userId = req.user.id;

      const { claimId, message } = req.body;
      const reply = await Replies.create({ claimId, userId, message });

      const updatedClaim = await updateOneclaim(claimId,{status:"replied"});
      return res.status(201).json(reply);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all replies for a specific claim
  async getRepliesByClaim(req, res) {
    try {
      const replies = await Replies.findAll({
        where: { claimId: req.params.claimId },
        include: [{ model: Users, as: "ReplyUser", attributes: ["firstname", "lastname", "email"] }],
      });
      return res.status(200).json(replies);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
