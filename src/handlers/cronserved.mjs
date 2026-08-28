//
// cronserved.mjs
// Triggered nightly by cron
// Queries APIG for number of calls and updated served.json in S3
//

// Load modules
import { s3Client } from "../libs/s3Client.mjs";
import { cwClient } from "../libs/cloudWatchClient.mjs";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetMetricDataCommand } from "@aws-sdk/client-cloudwatch";

// Declare global settings
const settings = {};

//
// loadServedFromS3
// Load the current served.json from S3
// Params:
// bucket: The S3 bucket name.
// key: The object key name.
async function loadServedFromS3(bucket,key) {
  console.debug(`loadServedFromS3 bucket: ${bucket} key: ${key}`); // DEBUG
  
  // Set S3 load params
  const s3LParams = {
    Bucket: bucket,
    Key: key
  };

  return await s3Client.send(new GetObjectCommand(s3LParams))
  .then(async (resp) => {
    console.debug(`loadServedFromS3:s3Client:resp:: `,resp); // DEBUG
    settings.served = JSON.parse(await resp.Body.transformToString());
    console.debug(`served assigned to settings.`); // DEBUG
    return;
  })  // End s3Client.send.then
  .catch((err) => {
    console.error(`loadServedFromS3:s3Client:err:: `,err);
    throw err;
  }); // End s3Client.send
} // end loadServedFromS3

//
// getMetricsFromAPIG
// Get the metrics from APIG for GET and POST requests since last update
// Params:
// 
async function getMetricsFromAPIG(apig) {
  const endTime = new Date();
  let startTime = settings?.served?.lastUpdated;

  if(!startTime || isNaN(startTime.getTime())) {
    startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // default to 24 hours ago
  }

  const periodInSeconds = Math.max(60, Math.floor((endTime.getTime() - startTime().getTime()) / 1000));

  // *********** PICK U8P HERE... ****************

} // End getMetricsFromAPIG





// ************
// Main handler
// ************
export const handler = async (event, context) => {
  console.log(`Received event: ${JSON.stringify(event,null,2)}`); // DEBUG:

  // Check if S3_BUCKET_NAME has been set as an environment variable
  if(!process.env.S3_BUCKET_NAME) {
    console.log(`process.env.S3_BUCKET_NAME is missing.`);
    await handleError("process.env.S3_BUCKET_NAME","Missing required environment variable.",context);
    throw new Error("Missing environment variable S3_BUCKET_NAME");
  }
  // Check if APIG_NAME has been set as an environment variable
  if(!process.env.APIG_NAME) {
    console.log(`process.env.APIG_NAME is missing.`);
    await handleError("process.env.APIG_NAME","Missing required environment variable.",context);
    throw new Error("Missing environment variable APIG_NAME");
  }
  // Check if STAGE_NAME has been set as an environment variable
  if(!process.env.STAGE_NAME) {
    console.log(`process.env.STAGE_NAME is missing.`);
    await handleError("process.env.STAGE_NAME","Missing required environment variable.",context);
    throw new Error("Missing environment variable STAGE_NAME");
  }

  try {


    // Post obj to Dynamo
    await postDynamo(eventObj);

    return createResponseObject({
      code: '200',
      message: "Hailing frequencies open.",
      cors: corsHeaders
    });

  } catch (err) {
    console.debug(`Error:..`,err); // DEBUG
  
  
    await handleError("Promise.all.catch",cro.message,context);
    console.debug(`catch:cro:: `,JSON.stringify(cro,null,2)); // DEBUG
    return createResponseObject(cro);

  } // End main try/catch

};  // End main Handler
  