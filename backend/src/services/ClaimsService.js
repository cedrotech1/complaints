
import db from "../database/entity/index.js";

const users = db["Users"];
const Claims = db["Claims"];
const Agencies = db["Agencies"];
const Replies = db["Replies"];

// ckeckClaim
export const approveClaim = async (id) => {
  const Claimtoapprove = await Claims.findOne(
    { where: { id } }

  );
  if (Claimtoapprove) {
    await Claims.update({ status: "approved" }, { where: { id } });
    return Claimtoapprove;
  }
  return null;
};

export const ckeckClaim = async (id) => {
  const Claimtoapprove = await Claims.findOne(
    { where: { id } }

  );
  if (Claimtoapprove) {
    await Claims.update({ status: "checked" }, { where: { id } });
    return Claimtoapprove;
  }
  return null;
};

export const unckeckClaim = async (id) => {
  const Claimtoapprove = await Claims.findOne(
    { where: { id } }

  );
  if (Claimtoapprove) {
    await Claims.update({ status: "pending" }, { where: { id } });
    return Claimtoapprove;
  }
  return null;
};


export const rejectClaim = async (id) => {
  const Claimtoapprove = await Claims.findOne(
    { where: { id } }

  );
  if (Claimtoapprove) {
    await Claims.update({ status: "rejected" }, { where: { id } });
    return Claimtoapprove;
  }
  return null;
};



export const updateUser = async (userId, points) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ points: points });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }


    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};

export const updateOneclaim = async (id, claimData) => {
  try {
    const claimToUpdate = await Claims.findOne({ where: { id } });
    
    if (!claimToUpdate) {
      return null;
    }

    await Claims.update(claimData, { where: { id } });
    const updatedClaim = await Claims.findOne({ where: { id } });

    return updatedClaim;
  } catch (error) {
    console.error('Error updating claim:', error);
    throw error;
  }
};



export const pending = async (id) => {
  const pending = await Claims.findAll({ where: { status:'pending' } });
  if (pending) {
    return pending;
  }
  return null;
};

export const getone = async (id) => {
  try {
    const Claim = await Claims.findByPk(id,
      {
        include: [
          {
            model: users,
            as: "ClaimsUser",
          },
          {
            model: Agencies,
            as: "ClaimsAgency",
          },
          {
            model: Replies,
            as: "ClaimsReplies",
            attributes: ['id', 'claimId', 'userId', 'message', 'file', 'createdAt', 'updatedAt'],
          },
        ],
      });

    return Claim;
  } catch (error) {
    console.error("Error fetching all Claim with users:", error);
    throw error;
  }
};

export const getAllClaims = async () => {
  try {
    const Claim = await Claims.findAll(
      {
        include: [
          {
            model: users,
            as: "ClaimsUser",
          },
          {
            model: Agencies,
            as: "ClaimsAgency",
          },
          {
            model: Replies,
            as: "ClaimsReplies",
            attributes: ['id', 'claimId', 'userId', 'message', 'file', 'createdAt', 'updatedAt'],
          },
        ],
      }
    );

    return Claim;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};

export const createClaim = async (ClaimData) => {
  try {
    return await Claims.create(ClaimData);
  } catch (error) {
    throw new Error(`Error creating Claim: ${error.message}`);
  }
};

export const checkExistingClaim = async (title) => {
  return await Claims.findOne({
    where: {
      title,
    },
  });
};

export const deleteOneClaim = async (id) => {
  const restToDelete = await Claims.findOne({ where: { id } });
  if (restToDelete) {
    await Claims.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await Claims.findOne({ where: { id } });
  if (restoToUpdate) {
    await Claims.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const deactivateResto = async (id) => {
  const restoToUpdate = await Claims.findOne({ where: { id } });
  if (restoToUpdate) {
    await Claims.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

