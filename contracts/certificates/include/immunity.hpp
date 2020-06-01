#pragma once

#include <eosio/asset.hpp>
#include <eosio/symbol.hpp>
#include <eosio/eosio.hpp>
#include <eosio/time.hpp>
#include <eosio/singleton.hpp>
#include <eosio/crypto.hpp>
#include <string>
#include <vector>


using namespace std;
using namespace eosio;

class [[eosio::contract("immunity")]] immunity :public eosio::contract {

   public:
     const int WEEK_SEC = 3600*24*7;
     //enum Type { RT_PCR = 0 , ANTIBODIES = 1 };

     struct test {
       name issuer;
       string test_id;
       string test_type;
       bool result;
       string sample_date;
     };

    [[eosio::action]]
    void setconfig(string version);

    [[eosio::action]]
    void issue( checksum256 card_id_hash,
                          vector<test> tests);


    immunity(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}



     struct [[eosio::table]] tokenconfigs {
        name standard;
        string version;
        uint64_t patient_id;
     };

     //scope is self
     struct [[eosio::table]] certificate {
        uint64_t id;
        checksum256 card_id_hash;
        vector<test> tests;


        uint64_t primary_key() const { return id; }
        checksum256 by_card_id()const { return card_id_hash; }


        static checksum256 hash(std::string str)
        {
          return sha256(const_cast<char*>(str.c_str()), str.size());
        }

     };

     EOSLIB_SERIALIZE( certificate, (id)(card_id_hash)(tests))

     using config_index = eosio::singleton<"tokenconfigs"_n, tokenconfigs>;
     using certificate_index = eosio::multi_index<"certificates"_n, certificate, indexed_by<"cardid"_n, const_mem_fun<certificate, checksum256, &certificate::by_card_id>>>;

};
