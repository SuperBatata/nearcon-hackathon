use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::ext_contract;
use near_sdk::{env, near_bindgen, AccountId, Gas, PanicOnDefault, Promise, PromiseError};
use serde::Serialize;

pub const TGAS: u64 = 1_000_000_000_000;

// UNSTAKERS
// Unstakers structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Clone, Debug, Serialize)]
pub struct Unstakers {
    account_id: String,
    unstaking_amount: u128,
    unstaking_time: u64,
}

#[ext_contract(ext_ft)]
pub trait StakingPool {
    #[payable]
    fn add_staker(&mut self, account: String, amount: u128);
    fn unstake (&mut self, account:String);
}

// Unstakers implementation
impl Unstakers {
    pub fn new() -> Self {
        Self {
            account_id: String::new(),
            unstaking_amount: 0,
            unstaking_time: 0,
        }
    }
}

// STAKERS
// Stakers structure
#[derive(BorshDeserialize, BorshSerialize, Clone, Debug, Serialize)]
pub struct Stakers {
    account_id: String,
    staking_amount: u128,
    staking_time: u64,
}

// Stakers implementation
impl Stakers {
    pub fn new() -> Self {
        Self {
            account_id: String::new(),
            staking_amount: 0,
            staking_time: 0,
        }
    }
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct StakingContract {
    stakers: Vector<Stakers>,
    unstakers: Vector<Unstakers>,
}

// Define the default, which automatically initializes the contract
impl Default for StakingContract {
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
impl StakingContract {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            stakers: Vector::new(b"a"),
            unstakers: Vector::new(b"a"),
        }
    }

    // delete all stakers
    pub fn delete_all_stakers(&mut self) {
        assert_self();
        for _i in 0..self.stakers.len() {
            self.stakers.pop();
        }
    }

    // delete all unstakers
    pub fn delete_all_unstakers(&mut self) {
        assert_self();
        for _i in 0..self.unstakers.len() {
            self.unstakers.pop();
        }
    }

    // Methods.

    // stake function
    pub fn stake(&mut self, amount: u128) {
        let mut staker = Stakers::new();
        staker.account_id = env::signer_account_id().to_string();
        staker.staking_amount = amount;
        staker.staking_time = env::block_timestamp();
        self.stakers.push(&staker);
        // deposit stake (..., accountid:user)
        self.deposit_stake(amount);
    }

    // funtion that pay near to an account
    pub fn pay(&self, amount: u128, to: AccountId) -> Promise {
        Promise::new(to).transfer(amount)
    }

    // deposit stake function
    #[payable]
    pub fn deposit_stake(&mut self, amount: u128) {
        let signer_account = env::signer_account_id().to_string();
        // let account = "lightencypool.testnet".to_string().try_into().unwrap();

        // account as account id
        let account = "lightencypool.testnet".to_string().try_into().unwrap();

        //let _payment = self.pay(amount, benificiary);
        // cross call function to change data in the staking pool
        ext_ft::ext(account)
            .with_static_gas(Gas(5 * TGAS))
            .add_staker(signer_account, amount);
    }

    // unstake function
    pub fn unstake(&mut self, amount: u128) {
        // conditions
        let mut unstaker = Unstakers::new();
        unstaker.account_id = env::signer_account_id().to_string();
        unstaker.unstaking_amount = amount;
        unstaker.unstaking_time = env::block_timestamp();
        self.unstakers.push(&unstaker);
        // account as account id
        let account = "lightencypool.testnet".to_string().try_into().unwrap();
        // cross call function to change data in the staking pool
        ext_ft::ext(account)
            .with_static_gas(Gas(5 * TGAS))
            .unstake(env::signer_account_id().to_string());
    }

    //withdraw function
    pub fn withdraw(&mut self, mut amount: u128) {
        let mut time: u64 = 0;
        for i in self.unstakers.to_vec() {
            if i.account_id == env::signer_account_id().to_string() {
                time = i.unstaking_time;
            }
        }
        if env::block_timestamp() > (time + 172800000000) {
            amount = amount * 1000000000000000000000000;
            let benificiary = env::signer_account_id();
            let _payment = self.pay(amount, benificiary);
            let mut index = 0;
            for i in 0..self.unstakers.len() {
                match self.unstakers.get(i) {
                    Some(d) => {
                        if d.account_id == env::signer_account_id().to_string() {
                            index = i;
                        }
                    }
                    None => panic!("There is no Unstaker"),
                }
            }
            self.unstakers.swap_remove(index);
        }
    }
}
