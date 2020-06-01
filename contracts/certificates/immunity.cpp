#include <immunity.hpp>

void immunity::setconfig(string version)
{

    require_auth( get_self() );

    // can only have one symbol per contract
    config_index config_table(get_self(), get_self().value);
    auto config_singleton  = config_table.get_or_create( get_self(), tokenconfigs{ "immunityproof"_n, version, 0 } );

    // setconfig will always update version when called
    config_singleton.version = version;
    config_table.set( config_singleton, get_self() );

}

void immunity::issue( checksum256 card_id_hash,
                      vector<test> tests)
{

    require_auth( get_self() );


    certificate_index certificate_table(get_self(), get_self().value );
    auto card_id_index = certificate_table.get_index<name("cardid")>();

    const auto& certificate_stats = card_id_index.find( card_id_hash );


    if( certificate_stats == card_id_index.end()) {

    //get patient_id (global id)
    config_index config_table( get_self(), get_self().value );
    check( config_table.exists(), "Config table does not exist" );
    auto config_singleton = config_table.get();
    auto patient_id = config_singleton.patient_id;


    certificate_table.emplace( get_self(), [&]( auto& stats ){
      stats.id = patient_id;
      stats.card_id_hash = card_id_hash;
      stats.tests = tests;
    });

    // successful creation of token, update patient_id to reflect
    config_singleton.patient_id++;
    config_table.set( config_singleton, get_self() );
  }
  else {
    card_id_index.modify( certificate_stats, get_self(), [&]( auto& stats ){
      for(unsigned int k = 0; k < tests.size(); k++) {
        stats.tests.push_back(tests[k]);
      }
    });
  }
}
