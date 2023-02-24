import { useToken } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getLpInfo } from 'utils/lpInfo'
import TokenImage from 'components/Common/TokenImage'
import Timer from '../../Launchpad/Pools/Subcomponents/Timer'


export default function AirdropCard({ data , status}) {
    let totalAmount = Number(formatUnits(data.info.totalAmountToAirdrop, 18))
    let totalDistributed = Number(formatUnits(data.info.totalAmountDistributed, 18))
    let remaining = (totalAmount - totalDistributed )
    let filledPerc = (remaining/totalAmount)*100
    debugger
    console.log(totalAmount, 'totalAmount')
    if(totalAmount === 0){
        filledPerc = 'NotStartedYet'
    }
 
    
    return(
        <Link to={`/airdropper/airdrops/${data.address}`} >
                            <div className="flex flex-col">
                                <div className={`bg-white dark:bg-dark-1 p-6 ${status === 3 ? "rounded-t-md" : "rounded-md"}`}>
                                    <div className="flex items-center">
                                        <img src={data.info.description[0]} alt={data.info.logoImage} className="w-[54px] h-[54px]" />
                                        
                                        <div className=" ml-4">
                                            <div className="flex items-center">
                                                <h3 className=" font-semibold text-dark-text dark:text-light-text">{data.info.description[7]}</h3>
                                            </div>

                                            <div className="flex items-center mt-2">
                                                {/* {data.tags.map((tag) => (
                                                    <div
                                                        key={tag.id}
                                                        className="bg-[#F5F1EB] dark:bg-dark-3 mr-[6px] py-[2px] px-[10px] rounded text-xs text-gray dark:text-gray-dark font-medium"
                                                    >
                                                        {tag.name}
                                                    </div>
                                                ))} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-8">
                                        <span className="text-sm font-medium text-gray dark:text-gray-dark">Amount</span>

                                        <div className="flex items-center">
                                            <img src={data.info.description[0]} className="w-[18px] h-[18px]" />

                                            <span className="ml-2 font-bold text-dark-text dark:text-light-text">
                                                {totalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-5">
                                        <span className="text-xs  text-gray dark:text-gray-dark">
                                            Remaining
                                        </span>

                                        <span className="text-xs  text-dim-text dark:text-dim-text-dark">
                                            {remaining.toLocaleString()} {data.token}
                                        </span>
                                    </div>

                                    {totalAmount !== 0? ( <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
                                        <div
                                            className={`h-18px ${status === 2 ? "filled-ended" : "filled"}  rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                                            style={{ width: `${Math.floor(filledPerc)}%` }}
                                        >
                                            {Math.floor(filledPerc)}%
                                        </div>
                                    </div>) : (
                                        <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
                                        <div
                                            className={`h-18px ${status === 2 ? "filled-ended" : "filled"}  rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                                            style={{ width: `${'Not Started yet'}` }}
                                        >
                                            {'Not Started yet'}
                                        </div>
                                    </div>
                                    )}

                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex flex-col items-center justify-between">
                                            <span className="text-xs font-medium text-gray dark:text-gray-dark">Selected Addr.</span>
                                            <span className="text-dark-text dark:text-light-text font-semibold">
                                                {data.info.numberWLAddresses.toNumber()}
                                            </span>
                                        </div>

                                        <div className="flex flex-col justify-between items-center">
                                            <span className="text-xs font-medium text-gray dark:text-gray-dark">Participants</span>

                                            <span className="text-dark-text dark:text-light-text font-semibold">
                                                {data.info.numberOfParticipants.toNumber()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* {data.status === 'Timed' &&
                                    <div className="bg-[#C89211] bg-opacity-[0.08] py-2 px-6 rounded-b-[20px] flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray dark:text-gray-dark">Ends in</span>
                                        <Timer time={data.ends_on} />
                                    </div>
                                } */}
                            </div>
                        </Link>
                               
    )
}