use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Gas, PanicOnDefault, Promise, PromiseError};
use near_sdk::{ext_contract, serde};
use serde::Serialize;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct FundsManager {
    near_balance: u128,
    lts_balance: u128,
    stable_coin_balance: u128,
}

#[ext_contract(ext_ft)]
pub trait SwapNear {
    fn ft_transfer_call(&mut self, receiver_id: AccountId, amount: String, msg: String);
}

// Define the default, which automatically initializes the contract
impl Default for FundsManager {
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

//test
// Implement the contract structure
// To be implemented in the front end
#[near_bindgen]
impl FundsManager {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            near_balance: 0,
            lts_balance: 0,
            stable_coin_balance: 0,
        }
    }

    #[payable]
    pub fn swap(&mut self, amount: String, msg: String) {
        let contract_account = "wrap.testnet".to_string().try_into().unwrap();
        let ref_account = "ref-finance-101.testnet".to_string().try_into().unwrap();

        ext_ft::ext(contract_account)
            .with_attached_deposit(1)
            .with_static_gas(Gas(5_000_000_000_000))
            .ft_transfer_call(ref_account, amount, msg);

    }
}
