import {
  connect,
  Contract,
  keyStores,
  WalletConnection,
  nearAPI,
} from "near-api-js";
import { async } from "regenerator-runtime";
import getConfig from "./config";

const nearConfig = getConfig("development");

console.log(`Using config: ${JSON.stringify(nearConfig, null, 2)}`);

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [
        'get_greeting',
        'get_all_daos',
        'get_dao',
        'get_all_proposals',,
        'get_proposal',
        'get_end_time',
        'get_votes_for',
        'get_votes_against',
        'get_nember_votes',
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        'set_greeting',
        'add_dao',
        'create_proposal',
        'add_vote',
        'check_the_proposal',
      ],
    }
  );
  window.energypool = await new Contract(
    window.walletConnection.account(),
    "energie_pool.testnet",
    {
      viewMethods: [
        "get_proposals",
        "get_specific_proposal",
        "get_end_time",
        "get_votes_for",
        "get_votes_against",
        "get_nember_votes",
      ],
      changeMethods: [
        "add_member",
        "remove_member",
        "create_proposal",
        "add_vote",
        "check_and_send_near"
      ],
    }
  );

  window.stake = await new Contract(
    window.walletConnection.account(),
    "lightencywallet.testnet",
    {
      viewMethods: [

      ],
      changeMethods: [
        "stake",
        "unstake",
        "withdraw"
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function set_greeting(message){
  let response = await window.contract.set_greeting({
    args:{message: message}
  })
  return response
}

export async function get_greeting(){
  let greeting = await window.contract.get_greeting()
  return greeting
}