use near_sdk::{ext_contract, PromiseOrValue};
use serde::{Serialize, Deserialize};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, env, near_bindgen, AccountId, Gas, Promise, PromiseError, PanicOnDefault};
use near_sdk::collections::{Vector, UnorderedMap};

#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize,Deserialize)]
pub struct Data {
    amount:u128,
    time:u64,
}

#[ext_contract(ext_ft)]
pub trait Rewardpool {
    #[payable]
    fn pay(&mut self, amount: u128, to: String);
}

#[ext_contract(ext_stakingpool)]
pub trait Stakingpool {
    fn get_data(&self, account:String) -> Vec<Data>;
    fn get_totalstaked(&self) -> u128;
    fn check_staker(&self,account:String) -> bool;
}

#[ext_contract(this_contract)]
trait Callbacks {
    fn get_data_callback(&self) -> Data;
    fn query_totalstaked_callback(&self) -> u128;
    fn check_staker_callback(&self) -> bool;
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Rewardercontract {
    redeemers:UnorderedMap<String,u64>,
    result1: bool,
}

impl Default for Rewardercontract {
    fn default() -> Self {
        panic!("Contract is not initialized yet")
    }
}

// Implement the Rewardercontract structure
#[near_bindgen]
impl Rewardercontract {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            redeemers: UnorderedMap::new(b"m"),
            result1:false,
        }
    }

    pub fn redeem(&mut self){
        if self.redeemers.get(&env::signer_account_id().to_string()).is_none() {
            self.redeemers.insert(&env::signer_account_id().to_string(),&env::block_timestamp());
        }
    }

    pub fn get_data_staker(&self, account:String) -> Promise{
        let contract = "lightencypool.testnet".to_string().try_into().unwrap();
        // Create a promise to call HelloNEAR.get_greeting()
        let promise = ext_stakingpool::ext(contract)
          .with_static_gas(Gas(5*1000000000000))
          .get_data(account);
        
        return promise.then( // Create a promise to callback query_greeting_callback
          Self::ext(env::current_account_id())
          .with_static_gas(Gas(5*1000000000000))
          .query_data_staker_callback()
        )
      }
    
        
    #[private]// Public - but only callable by env::current_account_id()
    pub fn query_data_staker_callback(&self, #[callback_result] call_result: Result<Vec<Data>, PromiseError>) -> Vec<Data> {
    // Check if the promise succeeded by calling the method outlined in external.rs
    if call_result.is_err() {
        panic!("There was an error contacting stakingpool contract");
    }
    
    // Return the greeting
    let data: Vec<Data> = call_result.unwrap();
    data
    }

    // ****** GETTER TOTAL STAKED*****//

    pub fn get_total_staked(&self) -> Promise {
        let account = "lightencypool.testnet".to_string().try_into().unwrap();
        // Create a promise to call HelloNEAR.get_greeting()
        let promise = ext_stakingpool::ext(account)
          .with_static_gas(Gas(5*1000000000000))
          .get_totalstaked();
        
        return promise.then( // Create a promise to callback query_greeting_callback
          Self::ext(env::current_account_id())
          .with_static_gas(Gas(5*1000000000000))
          .query_totalstaked_callback()
        )
    }

    #[private] // Public - but only callable by env::current_account_id()
    pub fn query_totalstaked_callback(&self, #[callback_result] call_result: Result<u128, PromiseError>) -> u128 {
    // Check if the promise succeeded by calling the method outlined in external.rs
    if call_result.is_err() {
        log!("There was an error contacting Hello NEAR");
        return 0;
    }

    // Return the greeting
    let totalstaked: u128 = call_result.unwrap();
    totalstaked
    }

    // ****** CHECK STAKER*****//

    pub fn get_check_staker(&self, accountid:String) -> PromiseOrValue<bool> {
        let account = "lightencypool.testnet".to_string().try_into().unwrap();
        // Create a promise to call HelloNEAR.get_greeting()
        let promise = ext_stakingpool::ext(account)
          .with_static_gas(Gas(5*1000000000000))
          .check_staker(accountid);
          PromiseOrValue::from(promise)
        
        // promise.then(Self::ext(env::current_account_id()).with_static_gas(Gas(5*1000000000000))
        // .check_staker_callback())
    }

    // Public - but only callable by env::current_account_id()
    // pub fn check_staker_callback(&self, #[callback_result] call_result: Result<bool, PromiseError>) -> bool {
    // // Check if the promise succeeded by calling the method outlined in external.rs
    // if call_result.is_err() {
    //     log!("There was an error contacting Hello NEAR");
    //     return false;
    // }

    // // Return the greeting
    // let result = call_result.unwrap();
    // result
    // }



    pub fn send_reward(&self ,amount:u128 , to:String){
        let account = "lightencyrewardpool.testnet".to_string().try_into().unwrap();
        ext_ft::ext(account)
            .with_static_gas(Gas(5 * 1000000000000))
            .pay(amount,to);
    }

    pub fn pay (&mut self){
        if self.redeemers.get(&env::signer_account_id().to_string()).is_some(){
                self.send_reward(1000000000000000000000000, env::signer_account_id().to_string());
                self.redeemers.remove(&env::signer_account_id().to_string());
        }
    }

}

