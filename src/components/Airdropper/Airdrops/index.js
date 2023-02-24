import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Airdrops } from '../../../data/airdrops'
import Timer from '../../Launchpad/Pools/Subcomponents/Timer'
import { ethers } from 'ethers'
import { useEthers} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import AirdropFactoryAbi from 'config/abi/AirdropFactory.json'
import AirdropCard from 'components/Airdropper/AirdropPage/AirdropCard.js';

export default function AirdropsBase({ endedList, timedList, liveList, activeTab }) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {activeTab === 2 &&
                endedList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab}/>)}

            {activeTab === 3 &&
                timedList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab}/>)}   

            {activeTab === 1 &&
                liveList.map((airdrop, index) => <AirdropCard key={index} data={airdrop} status={activeTab}/>)} 
        </div>
    )
}
