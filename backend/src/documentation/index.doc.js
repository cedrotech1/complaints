import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import Agencies from "../database/entity/Agencies";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Complains APIs documentation",
    version: "1.0.0",
    description: "RRA-claim APIs documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Claim", description: "Claim" },
    { name: "Agencies", description: "Agencies" },
    { name: "Replies", description: "Replies" },



  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Users",
              },
              example: {
                email: "superadmin@gmail.com",
                password: "1234",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "Add a customer",
        description: "Add a user",
        operationId: "addcustomerorrestadmin",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Users",
              },
              example: {
                firstname: "John",
                lastname: "cedrick",
                phone: "078654325",
                tinnumber: "29383834",
                nid: "23838",
                email: "cedrickhakuzimana@gmail.com",
                password: "1234",
                comfirmpassword: "1234",
              
             
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/add": {
      post: {
        tags: ["Users"],
        summary: "Add a employee admin",
        description: "Add a user",
        operationId: "addemployee",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Users",
              },
              example: {
                agencyId: 1,
                firstname: "John",
                lastname: "cedrick",
                phone: "078654325",
                tinnumber: "29383834",
                email: "test@example.com",
                password: "1234",
                        
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/check": {
      post: {
        tags: ["Users"],
        summary: "Get  users user by email by email and send code",
        description: "Get all users",
        operationId: "getAllUserscheck",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Users",
              },
              example: {
                email: "cedrickhakuzimana.com",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/code/{email}": {
      post: {
        tags: ["Users"],
        summary: "check code !",
        description: "checking code send thrugth email",
        operationId: "code",
        parameters: [
          {
            name: "email",
            in: "path",
            description: "User's email",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                code: "10000",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        description: "Get a user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/update/{id}": {
      put: {
        tags: ["Users"],
        summary: "Update a user",
        description: "Update a user",
        operationId: "updateOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstname: "John",
                lastname: "Doe",
                email: "test@example.com",
                phone: "08012345678",
              },
            },
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
// resetPassword
"/api/v1/users/resetPassword/{email}": {
  put: {
    tags: ["Users"],
    summary: "reset  user password",
    description: "reset  user password  !! ",
    operationId: "reset-passwordr",
    parameters: [
      {
        name: "email",
        in: "path",
        description: "User's email",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
          example: {
            newPassword: "newp",
            confirmPassword: "cpass",
           
          },
        },
      },
    },
    responses: {
      200: {
        description: "User password updated  successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

    "/api/v1/users/changePassword": {
      put: {
        tags: ["Users"],
        summary: "change  user password",
        description: "change  user password  for current loged in user !! ",
        operationId: "change-passwordr",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                oldPassword: "oldp",
                newPassword: "newp",
                confirmPassword: "cpass",
               
              },
            },
          },
        },
        responses: {
          200: {
            description: "User password updated  successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/users/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Delete a user",
        operationId: "deleteOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },




    "/api/v1/Claim/update/{id}": {
      put: {
        tags: ["Claim"],
        summary: "update a Claim",
        description: "Update a Claim",
        operationId: "updateClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
          
              example: {
                agencyId: 1,
                title: "my pin disoster",
                description: "after...big bb",
              },
            },
            required: true,
          },
        },
     
      
        responses: {
          201: {
            description: "Claim created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/add": {
      post: {
        tags: ["Claim"],
        summary: "Add a Claim",
        description: "Add a Claim",
        operationId: "addClaim",
        requestBody: {
          content: {
            "application/json": {
          
              example: {
                title: "my pin disoster",
                description: "after...big bb",
              },
            },
            required: true,
          },
        },
     
      
        responses: {
          201: {
            description: "Claim created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/Claim/": {
      get: {
        tags: ["Claim"],
        summary: "all  a Claim",
        description: "Claim",
        operationId: "all Claim",
      
      
        responses: {
          201: {
            description: "Claim retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Claim/upload/{id}": {
      "post": {
        "tags": ["Claim"],
        "summary": "Upload a PDF for a claim",
        "description": "Upload a PDF for a claim",
        "operationId": "addClaimUpload",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary",
                    "description": "PDF file to upload"
                  }
                },
                "required": ["file"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "File uploaded successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "fileUrl": {
                      "type": "string"
                    },
                    "public_id": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "message": "File uploaded successfully",
                    "fileUrl": "http://res.cloudinary.com/dzl8xve8s/pdf_uploads/sample.pdf",
                    "public_id": "sample"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "example": {
                    "error": "No file uploaded"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Something went wrong"
          }
        }
      }
    },
    "/api/v1/Claim/pending": {
      get: {
        tags: ["Claim"],
        summary: "all  a pending Claim",
        description: "pending Claim",
        operationId: "all pending Claim",
      
      
        responses: {
          201: {
            description: "Pending Claim retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/one/{id}": {
      get: {
        tags: ["Claim"],
        summary: "get one  a Claim",
        description: "customer/admin get one Claim",
        operationId: "getClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/delete/{id}": {
      delete: {
        tags: ["Claim"],
        summary: "delete a Claim",
        description: "delete Claim",
        operationId: "deleteClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/approve/{id}": {
      put: {
        tags: ["Claim"],
        summary: "Add a approve",
        description: "approve Claim",
        operationId: "approveClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim approved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/reject/{id}": {
      put: {
        tags: ["Claim"],
        summary: "reject a Claim",
        description: "rejecting Claim",
        operationId: "rejectClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/check/{id}": {
      put: {
        tags: ["Claim"],
        summary: "Add a check",
        description: "check Claim",
        operationId: "checkClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim checked successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Claim/uncheck/{id}": {
      put: {
        tags: ["Claim"],
        summary: "uncheck",
        description: "uncheck Claim",
        operationId: "uncheckClaim",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Claim's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Claim checked successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/agencies": {
      get: {
        tags: ["Agencies"],
        summary: "Get all agencies",
        responses: {
          200: { description: "List of agencies" },
        },
      },
      post: {
        tags: ["Agencies"],
        summary: "Create a new agency",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Agencies" },
              example: {
                name: "ICT Agency",
                location: "Kigali",
                contactEmail: "ict@rra.gov.rw",
                contactPhone: "0788000000",
               
              },
            },
          },
        },
        responses: {
          201: { description: "Agency created" },
          400: { description: "Bad request" },
        },
      },
    },
  
    "/api/v1/agencies/{id}": {
      get: {
        tags: ["Agencies"],
        summary: "Get agency by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Agency found" },
          404: { description: "Agency not found" },
        },
      },
      put: {
        tags: ["Agencies"],
        summary: "Update agency by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Agencies" },
            },
            example: {
              name: "ICT Agency",
              location: "Kigali",
              contactEmail: "ict@rra.gov.rw",
              contactPhone: "0788000000",
            },
          },
        },
        responses: {
          200: { description: "Agency updated" },
          404: { description: "Agency not found" },
        },
      },
      delete: {
        tags: ["Agencies"],
        summary: "Delete agency",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Agency deleted" },
          404: { description: "Agency not found" },
        },
      },
    },
  
    // 📢 Claims
    "/api/v1/Claim": {
      post: {
        tags: ["Claim"],
        summary: "Create a claim",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Claims" },
              example: {
             
                agencyId: 1,
                title: "VAT not refunded",
                description: "Business refused to refund VAT"
             
              },
            },
          },
        },
        responses: {
          201: { description: "Claim created" },
          400: { description: "Invalid input" },
        },
      },
      get: {
        tags: ["Claim"],
        summary: "Get all claims",
        responses: {
          200: { description: "List of claims" },
        },
      },
    },
  
    "/api/v1/Claim/{id}": {
      get: {
        tags: ["Claim"],
        summary: "Get claim by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Claim found" },
          404: { description: "Claim not found" },
        },
      },
    },
  
    // 💬 Replies
    "/api/v1/replies": {
      post: {
        tags: ["Replies"],
        summary: "Reply to a claim",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Reply" },
              example: {
                claimId: 1,
                message: "We have received your claim and will investigate.",
              },
            },
          },
        },
        responses: {
          201: { description: "Reply created" },
          400: { description: "Invalid input" },
        },
      },
    },
  
    "/api/v1/replies/claim/{claimId}": {
      get: {
        tags: ["Replies"],
        summary: "Get all replies for a claim",
        parameters: [
          {
            name: "claimId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Replies found" },
          404: { description: "No replies found" },
        },
      },
    },
  


  },

  components: {
    schemas: {
      Users: {
        type: "object",
        properties: {

          username: {
            type: "string",
            description: "User's username",
          },
         
          role: {
            type: "string",
            description: "User's role",
          },
    
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          password: {
            type: "string",
            description: "User's ponts",
          },
          agencyId: {
            type: "integer",
            description: "User's agency id",
          },

        },
      },
      Agencies: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Agency's name",
          },
          location: {
            type: "string",
            description: "Agency's location",
          },
          contactEmail: {
            type: "string",
            description: "Agency's contact email",
          },
          contactPhone: {
            type: "string",
            description: "Agency's contact phone",
          },
        },
      },
      Claims: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Claim's title",
          },
          description: {
            type: "string",
            description: "Claim's description",
          },
          date: {
            type: "string",
            description: "Claim's date",
          },
          time: {
            type: "string",
            description: "Claim's time",
          },
          status: {
            type: "string",
            description: "Claim's status",
          },
          agencyId: {
            type: "integer",
            description: "Claim's agency id",
          },

        },
      },
      Replies: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Reply's message",
          },
          claimId: {
            type: "integer",
            description: "Reply's claim id",
          },
          userId: {
            type: "integer",
            description: "Reply's user id",
          },
        },
      
    },


    
    

    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
