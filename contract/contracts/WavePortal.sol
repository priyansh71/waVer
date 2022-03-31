// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    struct wave {
        address waver;
        uint256 waves;
    }

    wave[] public stats;

    constructor() {
        console.log("Hello, This is a contract made at 3am!");
    }

    function doWave() public {
        if(stats.length == 0){
            wave memory newWaver = wave(msg.sender,1);
            stats.push(newWaver);
        }
        else {
            for(uint i = 0;i<stats.length;i++){
                if(stats[i].waver == msg.sender){
                    stats[i].waves += 1;
                }
                else{
                    wave memory newWaver = wave(msg.sender,1);
                    stats.push(newWaver);
                }
            }
        }
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
      console.log("We have %d total waves!", totalWaves);
      return totalWaves;
    }

    function VIP() public view returns (address){
        address vip;
        uint maxWaves = 0;
        for(uint i = 0;i<stats.length;i++){
            if(stats[i].waves > maxWaves){
                vip = stats[i].waver;
                maxWaves = stats[i].waves;
            }
        }
        console.log("The VIP is %s.", vip);
        return vip;
    }

}