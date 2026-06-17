//
// get.mjs
// Lambda that lists to APIG GET requests.
// Expects no inputs, returns random 'S'
//

// Load modules
import createResponseObject from 'create-response-object';
import { Buncha_Ss } from 'is_letter_s';


export const handler = async (event, context) => {

  // For GET requests, simply return a random entry from Buncha_Ss
  const entries = [...Buncha_Ss.entries()];
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  console.debug(`randomEntry: ${randomEntry}`); // DEBUG

  return createResponseObject({
    code: '200',
    message: randomEntry,
  });

};
  