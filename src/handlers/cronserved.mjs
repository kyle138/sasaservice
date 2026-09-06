//
// cronserved.mjs
// Triggered nightly by cron
// Queries APIG for number of calls and updated served.json in S3
//

// Load modules
import { s3Client } from "../libs/s3Client.mjs";
import { cwClient } from "../libs/cloudWatchClient.mjs";
import { handleError } from "../libs/handleError.mjs";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetMetricDataCommand } from "@aws-sdk/client-cloudwatch";

// Declare global settings
const settings = {};

//
// loadServedFromS3
// Load the current served.json from S3
// Params:
// bucket (string): The S3 bucket name.
// key (string): The object key name.
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
    const respString = await resp.Body.transformToString();
    console.debug(`respString: ${respString}`); // DEBUG
    settings.served = JSON.parse(respString);
    console.debug(`served assigned to settings.`); // DEBUG
    return;
  })  // End s3Client.send.then
  .catch((err) => {
    console.error(`loadServedFromS3:s3Client:err:: `,err);
    throw err;
  }); // End s3Client.send.catch
} // end loadServedFromS3

//
// putServedToS3
// Put the updated served.json in S3
// Params:
// bucket (string): The S3 bucket name.
// key (string): The object key name.
// payload (object): The new Payload to write to S3 in JSON
async function putServedToS3(bucket, key, payload) {
  console.debug(`putServedToS3 bucket: ${bucket} key: ${key}`); // DEBUG
  console.debug(`putServedToS3 payload: ${JSON.stringify(payload,null,2)}`); // DEBUG

  // Set S3 put commands
  const s3PParams = {
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(payload,null,2),
    ContentType: "application/json",
    CacheControl: "public, max-age=300, must-revalidate",
  };  // End s3PParams

  return await s3Client.send(new PutObjectCommand(s3PParams))
  .then(async (resp) => {
    console.debug(`putServedToS3:s3Client:resp:: `,resp); // DEBUG
    return;
  })  // End s3Client.send.then
  .catch((err) => {
    console.error(`putServedToS3:s3Client:err:: `,err);
    throw err;
  }); // End s3Client.send.catch
} // End putServedToS3

//
// getMetricsFromAPIG
// Get the metrics from APIG for GET and POST requests since last update
// Params:
// apig (string): The API Gateway ID
// stage (string): The API Gateway stage
// 
async function getMetricsFromAPIG(apig,stage) {
  const now = new Date(); // Set now to now, like now. 
  // Set EndTime to midnight (00:00:00.000 UTC) of the current day
  const endTime = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  )); // End endtime

  // Set default startime of 24 hours ago
  let startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
  let lastRuntime = settings?.served?.LastUpdated 
    ? new Date(settings.served.LastUpdated) 
    : null;
  
  // If we have the last run time override default 24hours with 00:00:00 of last run date.
  if(!isNaN(lastRuntime.getTime())) {
    startTime = new Date(Date.UTC(
      lastRuntime.getUTCFullYear(),
      lastRuntime.getUTCMonth(),
      lastRuntime.getUTCDate(),
      0, 0, 0, 0
    ));
  }
  console.debug(`startTime: ${startTime}`); //DEBUG

  // Check if last run time was less than 24 hours ago
  if ((endTime.getTime() - startTime.getTime()) < 24 * 60 * 60 * 1000) {
    console.log(
      `Execution skipped, less than 24 hours since last execution. ` + 
      `StartTime: ${startTime.toISOString()}, EndTime: ${endTime.toISOString()}`
    );
    return null;  // Exit before pulling new metrics. 
  }

  const cwParams = {
    StartTime: startTime,
    EndTime: endTime,
    MetricDataQueries: [
      {
        Id: "total_requests",
        MetricStat: {
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "Count",
            Dimensions: [
              // { Name: "ApiId", Value: apig },
              { Name: "ApiName", Value: apig },
              { Name: "Stage", Value: stage },
            ],
          },
          Period: 3600,
          Stat: "Sum",
        },
      },
    ],
  };  // End cwParams
  console.debug(`cwParams: `,JSON.stringify(cwParams,null,2)); // DEBUG

  const response = await cwClient.send(new GetMetricDataCommand(cwParams));
  console.debug(`cwClient:response:: `,JSON.stringify(response,null,2)); // DEBUG

  const results = response.MetricDataResults.find((r) => r.Id === "total_requests");

  return {
    LastUpdated: endTime.toISOString(),
    TotalRequests: results?.Values?.reduce((sum, value) => sum + value, 0) || 0
  };
} // End getMetricsFromAPIG

//
// formatServedMessage
// Formats the ServedMessage based on total requests
// Params:
// count (number): The current number of total requests
// Return (string): The Total Served message.
function formatServedMessage(count) {
  if (typeof count !== "number" || count < 0) {
    return "Over NaN 'S's Served!"
  }

  // Max out at 99 Billion Served, just like McD's
  if (count > 99000000000) {
    return "Over 99 Billion 'S's Served!";
  }

  // Set thresholds for message.
  const units = [
    { threshold: 1e9, label: "Billion" },
    { threshold: 1e6, label: "Million" },
    { threshold: 1e3, label: "Thousand" }
  ];

  for(const { threshold, label } of units) {
    if (count>=threshold) {
      const rawValue = count / threshold;
      let formattedNumber;

      if (rawValue >= 100) {
        // round down to nearest hundred
        formattedNumber = Math.floor(rawValue / 100) * 100;
      } else if (rawValue >= 10) {
        // round down to nearest 10
        formattedNumber = Math.floor(rawValue / 10) * 10;
      } else {
        // round down to nearest integer
        formattedNumber = Math.floor(rawValue);
      }

      return `Over ${formattedNumber} ${label} 'S's Served!`;
    } // End if
  } // End for loop
} // End formatServedMessage

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
    // Retrieve existing served.json from S3
    await loadServedFromS3(process.env.S3_BUCKET_NAME,"data/served.json");
    console.debug(`settings: `,JSON.stringify(settings,null,2)); // DEBUG

    // Retrieve metrics from API Gateway
    const metrics = await getMetricsFromAPIG(
      process.env.APIG_NAME,
      process.env.STAGE_NAME
    );
    
    // If metrics is null...
    if (metrics === null) {
      console.log(`Shut'er down`);
      return;
    }

    // Keep going with metrics.     
    console.debug(`API Gateway Metrics: `,JSON.stringify(metrics,null,2)); // DEBUG

    // Add updated metrics and saved to S3
    const TRL = settings.served.TotalRequests + metrics.TotalRequests;

    const updated = {
      LastUpdated: metrics.LastUpdated,
      TotalRequests: TRL,
      ServedMessage: formatServedMessage(TRL)
    };

    // Save the updated served.json to S3
    await putServedToS3(
      process.env.S3_BUCKET_NAME,
      "data/served.json",
      updated
    );

    return;
  } catch (err) {
    console.debug(`Error:..`,err); // DEBUG
  
  
    await handleError("Try/Catch",err.message,context);
    return err;

  } // End main try/catch

};  // End main Handler
  