import { authenticateUser } from "./api/LoginApi";
import { generateBearerToken } from "./api/TokenApi";
import { generateRSAKeyPair } from "./utils/keys";
import * as readline from "readline";
import dotenv from "dotenv";
dotenv.config();

const chaincode = require("./chaincode/DidCc");

let username = "";
let password = "";
let authToken = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUsernameAndPasswordFromUser() {
  return new Promise<void>((resolve) => {
    rl.question("Enter your username: ", (l_username: string) => {
      rl.question("Enter your password: ", (l_password: string) => {
        console.log(`Username: ${l_username}`);
        console.log(`Password: ${l_password}`);
        username = l_username;
        password = l_password;
        rl.close();
        resolve();
      });
    });
  });
}

async function main() {
  try {
    const usernameFromEnv = process.env.USERNAME;
    const passwordFromEnv = process.env.PASSWORD;

    if (usernameFromEnv && passwordFromEnv) {
      console.log(`Username from environment: ${usernameFromEnv}`);
      console.log(`Password from environment: ${passwordFromEnv}`);
      username = usernameFromEnv;
      password = passwordFromEnv;
    } else {
      await getUsernameAndPasswordFromUser();
    }
    console.log("\n");
    const credentials = `${username}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    authToken = await generateBearerToken();
    console.log("Bearer Token:", authToken, "\n");

    const data = await authenticateUser(authToken, encodedCredentials);
    console.log("Authentication response:", data, "\n");

    // generate public key
    const keyPair = generateRSAKeyPair();

    console.log("Public Key:");
    console.log(keyPair.publicKey, "\n");

    const response = await chaincode.createDID(encodedCredentials, keyPair.publicKey);
    console.log("Create DID response:", response, "\n");
    const did = response;

    const didDoc = await chaincode.resolveDID(encodedCredentials, did.id);
    console.log("DID Document:", didDoc, "\n");

    // const didDocUpdated_1 = await chaincode.updateDID(
    //   encodedCredentials,
    //   did.id,
    //   did.id,
    //   "AddNewAssertionMethod"
    // );
    // console.log("DID Document updated:", didDocUpdated_1, "\n");

    // const didDocUpdated_2 = await chaincode.updateDID(
    //   encodedCredentials,
    //   did.id,
    //   did.id,
    //   "AddAssertionMethod",
    //   "#key-1"
    // );
    // console.log("DID Document updated:", didDocUpdated_2, "\n");

    
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
