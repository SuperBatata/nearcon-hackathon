
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use serde::{Serialize};
use near_sdk::{env, near_bindgen, Promise};
use near_sdk::collections::{UnorderedMap};

#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize)]
pub struct Data {
    amount:u128,
    time:u64,
}


// Data implementation

impl Data {
    pub fn new() -> Self {
        Self { amount: 0, time: 0 }
    }
}


// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct RewardPoolContract {
    records: UnorderedMap<String,Vec<Data>>,
}

impl Default for RewardPoolContract {
    fn default() -> Self {
        panic!("Contract is not initialized yet")
    }
}

// Implement the contract structure
#[near_bindgen]
impl RewardPoolContract {

    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            records: UnorderedMap::new(b"m"),
        }
    }

    pub fn pay(&mut self, amount: u128, to: String){
        Promise::new(to.to_string().try_into().unwrap()).transfer(amount);
        let account = to;
        if self.records.get(&account).is_none() {
            let mut v = Vec::new();
            let data = Data {
                amount : amount,
                time: env::block_timestamp(),
            };
            v.push(data);
            self.records.insert(&account, &v);
        }else {
            let mut v = self.records.get(&account).unwrap(); 
            let data = Data {
                amount : amount,
                time: env::block_timestamp(),
            };
            v.push(data);
            self.records.remove(&account);
            self.records.insert(&account, &v);
        }
    }
}


