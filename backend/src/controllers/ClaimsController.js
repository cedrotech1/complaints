// ClaimController.js
import {
  createClaim,
  getAllClaims,
  deleteOneClaim,
  pending,
  approveClaim,
  rejectClaim,
  getone,
  updateOneclaim,
  ckeckClaim,
  unckeckClaim,
  
} from "../services/ClaimsService";
import {getUserEmployees} from "../services/userService";
import Email from "../utils/mailer";
import { upload } from '../utils/cloudinaryConfig';
import imageUploader from "../helper/imageUplouder";
// import imageUploader from "../helper/imageUploader";

export const uploadPdf = async (req, res) => {
  try {
    console.log('Request received for file upload');

    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }
    // const { id } = req.params;
    console.log(req.params.id)
    // let data = await getone(id);
    // if (!data) {
    //   return res.status(404).json({
    //     message: "Claim not found",
    //   });
    // }
    if (req.files && req.files.file) { // Ensure req.files.file exists
      console.log('File received:', req.files.file);
      const image = await imageUploader(req);
      if (!image || !image.url) {
      
        throw new Error('Upload failed or image URL missing');
      }
      req.body.file = image.url;
      console.log(req.params.id,req.body)
      req.body.status = 'rib-approved';
      const updatedClaim = await updateOneclaim(req.params.id,req.body);

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        updatedClaim,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};



export const addClaimController = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }
    let agencyId=req.body.agencyId;

    let approval = await getUserEmployees(agencyId);

    req.body.userid = req.user.id
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    req.body.date = date;
    req.body.time = time;


    if (!req.body.title ||  !req.body.description) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }
    req.body.status = "pending";

    const newClaim = await createClaim(req.body);
  
    const email = new Email(req.user, newClaim);
    await email.sendClaimConfirmation();
    // console.log(approval);

    if (approval && approval.length > 0) {
      approval.forEach(async (user) => {
        await new Email(user, newClaim).sendClaimNewRequest();
      });
    }



    return res.status(201).json({
      success: true,
      message: "new Claim created successfully",
      Claim: newClaim,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateClaimController = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }
    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "claim not found",
      });
    }

    if (data.status === "approved") {
      return res.status(404).json({
        success: false,
        message: "You are too late to update this Claim because it aready approved !",
      });
    }

    if (data.status === "rejected") {
      return res.status(404).json({
        success: false,
        message: "You are too late to update this Claim because it aready rejected !",
      });
    }

    req.body.userid = req.user.id
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    // req.body.date = date;
    // req.body.time = time;


    if (!req.body.title ||  !req.body.description) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }
    // req.body.status = "pending";

    const updatedClaim = await updateOneclaim(req.params.id,req.body);


    return res.status(201).json({
      success: true,
      message: "Claim updated successfully",
      // Claim: updatedClaim,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const approveClaimController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }
    // req.body.status = "pending";
    const Claim = await approveClaim(req.params.id);
    // console.log(data);

    const email = new Email(data.ClaimsUser, data);
    await email.sendClaimApproval();

    return res.status(201).json({
      success: true,
      message: "Claim approved successfully",
      // Claim: Claim,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const ckeckClaimController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }
    // req.body.status = "pending";
    const Claim = await ckeckClaim(req.params.id);

    const email = new Email(data.ClaimsUser, data);
    await email.sendClaimCheckedApproval();

    return res.status(201).json({
      success: true,
      message: "Claim checked successfully now client can give it to RIB",
      // Claim: Claim,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const unckeckClaimController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }
    // req.body.status = "pending";
    const Claim = await unckeckClaim(req.params.id);

    const email = new Email(data.ClaimsUser, data);
    await email.sendClaimUnCheckedRejection();

    return res.status(201).json({
      success: true,
      message: "Claim un checked successfully",
      // Claim: Claim,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const rejectClaimController = async (req, res) => {
  try {
    if (req.user.role !== "employee" && req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  employee",
      });
    }

    const data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }

 
    req.body.status = "rejected";
    const Claim = await rejectClaim(req.params.id);

    const email = new Email(data.ClaimsUser, data);
    await email.sendClaimRejection();

    return res.status(201).json({
      success: true,
      message: "Claim rejected successfully",
      // Claim: Claim,
      


    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteOneClaimController = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }


    let data = await getone(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }


    if (data.status === "approved") {
      return res.status(404).json({
        success: false,
        message: "You are too late to cancil this Claim becouse it aready approved !",
      });
    }
    if (data.status === "rejected") {
      return res.status(404).json({
        success: false,
        message: "You are too late to cancil this Claim becouse it aready rejected !",
      });
    }

    const Claim = await deleteOneClaim(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Claim deleted successfully",
      Claim:Claim,

    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const Claims = async (req, res) => {
  try {


    let allClaims = await getAllClaims();
    let data;

    if (req.user.role == "employee" || req.user.role == "superadmin") {

      data = allClaims;
    }
    if (req.user.role === "customer") {

      data = allClaims.filter(Claim => Claim.userid === req.user.id);
    }




    return res.status(200).json({
      success: true,
      message: "Claim retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const pendingController = async (req, res) => {
  try {


    let allClaims = await pending();
    let data;

    if (req.user.role == "employee" || req.user.role == "superadmin") {

      data = allClaims;
    }
    if (req.user.role === "customer") {
      data = allClaims.filter(Claim => Claim.userid === req.user.id);
    }
    return res.status(200).json({
      success: true,
      message: "pending Claims retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOneClaimController = async (req, res) => {


  try {
    const { id } = req.params;
    let data = await getone(id);
    if (!data) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }
    if (req.user.role === "customer") {
      // if (!Array.isArray(data)) {
      //   data = [data];
      // }
      // data = data.filter(Claim => Claim.userid === req.user.id);

      // if (data.userid != req.user.id) {
      //   return res.status(200).json({
      //     success: true,
      //     message: "Claim there is no Claim you make",
      //     data: data
      //   });
      // }
    }

  
    return res.status(200).json({
      success: true,
      message: "Claim retrieved successfully",
      data,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// 0725998330
