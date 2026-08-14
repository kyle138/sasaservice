//
// get.mjs
// Lambda that lists to APIG GET requests.
// Expects no inputs, returns random 'S'
//

// Load modules
import createResponseObject from 'create-response-object';
import { Buncha_Ss } from 'is_letter_s';

// Declare entries up here to survive warm restarts
const entries = [...Buncha_Ss.entries()];

export const handler = async (event, context) => {

  console.log(`Received event: ${JSON.stringify(event,null,2)}`); // DEBUG:

  // Is this a bulk request? Check if querystring 'quantity' is set and is an integer
  if (/^-?\d+$/.test(event.queryStringParameters?.quantity)) {
    // Convert quantity (string) to Number
    let q = Number(event.queryStringParameters.quantity.trim());
    // Cap q at 10
    q = q > 10 ? 10 : q;

    let Esses = [];

    // Push the specified quantity of Ss to Esses, no descriptions
    while(Esses.length < q) {
      Esses.push(entries[Math.floor(Math.random() * entries.length)][0]);
    }
    console.debug(`Esses: ${JSON.stringify(Esses,null,2)}`); // DEBUG

    return createResponseObject({
      code: '200',
      message: JSON.stringify(Esses,null,2),
      cors: {
        allowOrigin: event?.headers?.origin || '*',
        allowMethods: 'OPTIONS,GET'
      }
    });    
  } // End if bulk request

  // For plain GET requests, simply return a random entry from Buncha_Ss
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  const message = {};
  [message.letter, message.description] = randomEntry;
  console.debug(`message: ${JSON.stringify(message,null,2)}`); // DEBUG

  return createResponseObject({
    code: '200',
    message: JSON.stringify(message,null,2),
    cors: {
      allowOrigin: event?.headers?.origin || '*',
      allowMethods: 'OPTIONS,GET'
    }
  });

};
