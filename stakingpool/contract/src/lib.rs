use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use serde::Serialize;
use near_sdk::collections::{UnorderedMap};
use near_sdk::{env, near_bindgen};

// DATA
// Data structure

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
pub struct StakingPoolContract {
    records: UnorderedMap<String,Vec<Data>>,
}

// Define the default, which automatically initializes the contract
impl Default for StakingPoolContract {
    fn default() -> Self {
        panic!("Contract is not initialized yet")
    }
}

// Make sure that the caller of the function is the owner
fn assert_self() {
    assert_eq!(
        env::current_account_id(),
        env::predecessor_account_id(),
        "Can only be called by owner"
    );
}

// Implement the contract structure
// To be implemented in the front end 
#[near_bindgen]
impl StakingPoolContract {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            records: UnorderedMap::new(b"m"),
        }
    }

    // delete all data
    pub fn delete_all_data(&mut self){
        assert_self();
        self.records.clear();
    }

    // add staker 
    pub fn add_staker(&mut self, account:String, amount:u128) {
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

    pub fn check_staker(&self, account:String) -> bool {
        let mut existance = false;
        let stakers = self.records.keys_as_vector();
        for i in stakers.to_vec() {
            if account == i {
                existance = true;
                break;
            }
        }
        existance
    }



    pub fn get_totalstaked(&self) -> u128 {
        let mut sum:u128= 0;
        for i in self.records.values_as_vector().to_vec() {
            for j in i {
                sum = sum + j.amount;
            }
        }
        sum
    }

    pub fn get_data(&self, account:String) -> Vec<Data> {
        self.records.get(&account).unwrap()
    } 

}