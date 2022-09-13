use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use serde::Serialize;
use near_sdk::collections::Vector;
use near_sdk::{env, near_bindgen, Promise, AccountId};

// VOTE
// Vote structor 
#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
#[derive(Serialize)]
 pub struct Vote{
    pub address: String,
    pub vote:u8,
    pub time_of_vote:u64,
 }

// Vote implementation 
 impl Vote {
    pub fn new() -> Self{
        Self {
            address: String::new(),
            vote:0,
            time_of_vote:0,
        }
    }
 }

// PROPOSAL
// Proposal structor 
#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
#[derive(Serialize)]
pub struct Proposals{
    pub proposal_name: String,
    pub description: String,
    pub proposal_creator: String,
    pub votes_for: u32,
    pub votes_against: u32,
    pub time_of_creation:u64,
    pub duration_days:u64,
    pub duration_hours:u64,
    pub duration_min:u64,
    pub list_voters:Vec<String>,
    pub votes:Vec<Vote>,
}

// Proposal implementation
impl Proposals {
    pub fn new() -> Self{
        Self {
            proposal_name: String::new(),
            description: String::new(),
            proposal_creator: String::new(),
            votes_for: 0,
            votes_against: 0,
            time_of_creation:0,
            duration_days:0,
            duration_hours:0,
            duration_min:0,
            list_voters:Vec::new(),
            votes:Vec::new(),
        }
    }

    pub fn create_vote(&mut self, vote:u8) -> Self{
        for i in self.list_voters.clone(){
            assert!(
                env::signer_account_id().to_string() != i,
                "You already voted"
            );
        }
        let v = Vote{
            address: env::signer_account_id().to_string(),
            vote:vote,
            time_of_vote:env::block_timestamp(),
        };
        self.votes.push(v);
        if vote==0 {
            self.votes_against=self.votes_against+1;
        }else{
            self.votes_for=self.votes_for+1;
        }
        self.list_voters.push(env::signer_account_id().to_string());
        Self { 
            proposal_name: self.proposal_name.clone(), 
            description: self.description.clone(),
            proposal_creator: self.proposal_creator.clone(),
            votes_for: self.votes_for, 
            votes_against: self.votes_against, 
            time_of_creation: self.time_of_creation, 
            duration_days: self.duration_days, 
            duration_hours: self.duration_hours, 
            duration_min: self.duration_min, 
            list_voters: self.list_voters.clone(),
            votes: self.votes.clone() 
        }
    }

    pub fn end_time(&self) -> u64 {
        self.time_of_creation+(self.duration_days*86400000000+self.duration_hours*3600000000+self.duration_min*60000000)
    }

    pub fn check_proposal(&self)->bool{
        if env::block_timestamp() > self.end_time() {
            return true;
        }
        return false;
    }

}

// DAO
// Dao structor
#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
#[derive(Serialize)]
pub struct Dao {
    pub dao_name: String,
    pub dao_purpose: String,
    pub founder: String,
    pub dao_members: Vec<String>,
    pub numb_members: u64,
    //proposal
    pub number_of_proposals:u16,
    pub proposals : Vec<Proposals>,
    //Voting
    pub threshold:u8,
    pub duration_days:u64,
    pub duration_hours:u64,
    pub duration_min:u64
}

// Dao implementation
impl Dao {
    pub fn new() -> Self{
        Self {
            dao_name:String::new(),
            dao_purpose:String::new(),
            founder:String::new(),
            dao_members:Vec::new(),
            numb_members:0,
            number_of_proposals:0,
            proposals:Vec::new(),
            threshold:0,
            duration_days:0,
            duration_hours:0,
            duration_min:0,
        }
    }

    pub fn create_proposal (
        &mut self,
        proposal_name: String,
        description: String,
        duration_days:u64,
        duration_hours:u64,
        duration_min:u64
    ){
        let proposal=Proposals{
            proposal_name: proposal_name,
            description: description,
            proposal_creator: env::signer_account_id().to_string(),
            votes_for: 0,
            votes_against: 0,
            time_of_creation:env::block_timestamp(),
            duration_days:duration_days,
            duration_hours:duration_hours,
            duration_min:duration_min,
            list_voters:Vec::new(),
            votes:Vec::new()
        };
        self.proposals.push(proposal);
    }

    pub fn replace_proposal(&mut self, proposal: Proposals){
        let mut index =0;
        for i in 0..self.proposals.len(){
            match self.proposals.get(i){
                Some(p) => if p.proposal_name==proposal.proposal_name {
                    index=i;
                },
                None => panic!("There is no DAOs"),
            }
        }
        self.proposals.swap_remove(index);
        self.proposals.insert(index, proposal);
    }

    pub fn get_proposals(&self) -> Vec<Proposals>{
        self.proposals.clone()
    }

    pub fn get_specific_proposal(&self, proposal_name: String) -> Proposals{
        let mut proposal= Proposals::new();
        for i in 0..self.proposals.len() {
            match self.proposals.get(i){
                Some(p) => if p.proposal_name==proposal_name {
                    proposal=p.clone();
                },
                None => panic!("There is no DAOs"),
            }
        }
        proposal
    }
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct DaoCreationContract {
    records: Vector<Dao>,
}

// Define the default, which automatically initializes the contract
impl Default for DaoCreationContract {
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
impl DaoCreationContract {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            records: Vector::new(b"a"),
        }
    }

    // delete all daos
    pub fn delete_all(&mut self){
        assert_self();
        for _i in 0..self.records.len(){
            self.records.pop();
        }
    }

    // Methods.

    // create dao
    pub fn add_dao(
        &mut self,
        dao_name: String,
        dao_purpose: String,
        threshold:u8,
        duration_days:u64,
        duration_hours:u64,
        duration_min:u64,
    ) {
        let mut dao = Dao {
            dao_name: dao_name,
            dao_purpose: dao_purpose,
            founder:env::signer_account_id().to_string(),
            dao_members:Vec::new(),
            numb_members: 1,
            number_of_proposals:0,
            proposals : Vec::new(),
            threshold:threshold,
            duration_days:duration_days,
            duration_hours:duration_hours,
            duration_min:duration_min,
        };
        dao.dao_members.push(dao.founder.clone());
        self.records.push(&dao);
    }

    // get all daos
    pub fn get_all_daos(&self) -> Vec<Dao>{
        let mut vec= Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d),
                None => panic!("There is no DAOs"),
            }
        }
        vec
    }

    // get a specific dao
    pub fn get_dao(&self, dao_name: String) -> Dao {
        let mut dao= Dao::new();
        for i in 0..self.records.len() {
            match self.records.get(i){
                Some(d) => if d.dao_name==dao_name {
                    dao=d;
                },
                None => panic!("There is no DAOs"),
            }
        }
        dao
    }

    // funtion that pay near to an account
    pub fn pay(&self, amount: u128, to: AccountId) -> Promise {
        Promise::new(to).transfer(amount)
    }

    // create proposal
    #[payable]
    pub fn create_proposal(
        &mut self,
        dao_name: String,
        proposal_name: String,
        description: String,
        mut duration_days:u64,
        mut duration_hours:u64,
        mut duration_min:u64
    ){
        let mut dao= Dao::new();
        let mut index=0;
        for i in 0..self.records.len() {
            match self.records.get(i){
                Some(d) => if d.dao_name==dao_name {
                    dao=d;
                    index=i;
                },
                None => panic!("There is no DAOs"),
            }
        }
        if duration_days == 0 && duration_hours == 0 && duration_min == 0 {
            duration_days = dao.duration_days;
            duration_hours = dao.duration_hours;
            duration_min = dao.duration_min;
        }
        dao.create_proposal(proposal_name, description, duration_days, duration_hours, duration_min);
        self.records.replace(index, &dao);
        let amount= 5000000000000000000000000;
        let benificiary= "daolightency.testnet".to_string().try_into().unwrap();
        let _payment=self.pay(amount,benificiary);
    }

    // get all proposals in a specific dao 
    pub fn get_all_proposals(&self,dao_name: String) -> Vec<Proposals> {
        let dao=self.get_dao(dao_name);
        dao.get_proposals()
    }

    //get a specific proposal in a specific dao
    pub fn get_proposal(&self, dao_name: String,proposal_name: String) -> Proposals{
        let dao=self.get_dao(dao_name);
        dao.get_specific_proposal(proposal_name)
    }

    //get the end time of a specific proposal
    pub fn get_end_time(&self, dao_name: String,proposal_name: String) -> u64 {
        let proposal=self.get_proposal(dao_name, proposal_name);
        proposal.end_time()
    }

    // add a vote 
    pub fn add_vote(
        &mut self,
        dao_name: String,
        proposal_name: String,
        vote: u8
    ){
        let proposal =self.get_dao(dao_name.clone()).get_specific_proposal(proposal_name).create_vote(vote);
        let mut dao= Dao::new();
        let mut index=0;
        for i in 0..self.records.len() {
            match self.records.get(i){
                Some(mut d) => if d.dao_name==dao_name {
                    d.replace_proposal(proposal.clone());
                    dao=d;
                    index=i;
                },
                None => panic!("There is no DAOs"),
            }
        }
        self.records.replace(index, &dao);
    }

    // get votes for 
    pub fn get_votes_for(&self, dao_name: String,proposal_name: String) -> u32 {
        let proposal= self.get_dao(dao_name.clone()).get_specific_proposal(proposal_name);
        proposal.votes_for
    }

    // get votes against 
    pub fn get_votes_against(&self, dao_name: String,proposal_name: String) -> u32 {
        let proposal= self.get_dao(dao_name.clone()).get_specific_proposal(proposal_name);
        proposal.votes_against
    }

    // get number of votes 
    pub fn get_nember_votes(&self, dao_name: String,proposal_name: String) -> u32{
        let proposal= self.get_dao(dao_name.clone()).get_specific_proposal(proposal_name);
        proposal.votes_against + proposal.votes_for
    }

    // check the proposal and return a message
    pub fn check_the_proposal(&self, dao_name: String,proposal_name: String) -> String{
        let proposal=self.get_proposal(dao_name, proposal_name);
        let check= proposal.check_proposal();
        if check==true {
            let msg="Proposal accepted".to_string();
            msg
        }else{
            let msg="Proposal refused".to_string();
            msg
        }
    }

}