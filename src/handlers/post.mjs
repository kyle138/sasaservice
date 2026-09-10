//
// post.mjs
// Lambda that responds to APIG POST requests.
// Expects a letter with verbose option.
// Returns verdict or verbose description of the provided letter S.
//

// Load modules
import createResponseObject from 'create-response-object';
import isLetterS from 'is_letter_s';


// ************
// Main handler
// ************
export const handler = async (event, context) => {
  console.log(`Received event: ${JSON.stringify(event,null,2)}`); // DEBUG:

  // Set CORS headers
  const allowedOrigins = [
    'http://localhost:5173',
    'https://sasaservice.com'
  ];
  const requestOrigin = event?.headers?.origin || event?.headers?.Origin; 
  const corsOrigin = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : "https://sasaservice.com";

  const corsHeaders = {
    // allowOrigin: '*',
    allowOrigin: corsOrigin,
    allowMethods: 'OPTIONS,POST'
  };

  try {

    // Parse the event body
    var eventObj; // var instead of let so catch can reference.
    try {
      eventObj = JSON.parse(event?.body || '{}');
    } catch (parseErr) {
      return createResponseObject({
        code: '400',
        message: 'Malformed JSON payload.',
        cors: corsHeaders
      });
    } // End try/catch JSON.parse(body)

    // Check if letter is provided
    if(!eventObj.letter) {
      console.error(`eventObj.letter is missing.`);
      return createResponseObject({
        code: '400',
        message: 'Invalid request, letter is a required parameter.',
        cors: corsHeaders
      });
    } // End if letter missing

    // Check if letter is an 'S'
    let resp;
    if(eventObj?.verbose && eventObj.verbose === true) {
      console.debug(`Verbose option provided.`); // DEBUG
      resp = isLetterS(eventObj.letter, { verbose: true });
    } else {
      resp = {verdict: isLetterS(eventObj.letter)};
    } // End if verbose...isLetterS
    // console.debug(`isLetterS response: `,JSON.stringify(resp,null,2)); // DEBUG
    resp = JSON.stringify(resp); // Stringify the response for consistent output
    console.debug(`isLetterS response stringified: ${resp}`); // DEBUG
    
    return createResponseObject({
      code: '200',
      message: resp,
      cors: corsHeaders
    });

  } catch (err) {
    console.debug(`Error:..`,err); // DEBUG
    
    return createResponseObject({
      code: '500',
      message: err.toString(),
      cors: corsHeaders
    });

  } // End main try/catch

};  // End main handler
  