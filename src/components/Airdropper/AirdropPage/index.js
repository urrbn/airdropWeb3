import React, { useState } from 'react'
import Preview from './Preview'
import UserPanel from './UserPanel'
import AdminPanel from "./Admin"
import { formatUnits } from 'ethers/lib/utils'


export default function AirdropPageBase({ status , airdrop, showModal, admin }) {
  const [upcoming] = useState(true)
  const [whitelisted] = useState(false)

  var date;
  var formattedTime;


  let totalAmount = Number(formatUnits(airdrop.info.totalAmountToAirdrop, 18))
  let totalDistributed = Number(formatUnits(airdrop.info.totalAmountDistributed, 18))
  let remaining = (totalAmount - totalDistributed )
  let filledPerc = (remaining/totalAmount)*100
  // debugger
  // console.log(totalAmount, 'totalAmount')
  // if(totalAmount === 0){
  //     filledPerc = 'NotStartedYet'
  // }


  console.log(airdrop.info.description, 'airdrop.info.description[6]');
  
  if(airdrop.info.startTime.toNumber() === 0){
      date = '';
      formattedTime = 'Not started yet';
  }else{
    date = new Date(airdrop.info.startTime.toNumber() * 1000);
    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();

    var seconds = "0" + date.getSeconds();

    formattedTime = hours + ':' + minutes.substr(-2) + ' ' + date.toDateString()
  }
  
  console.log(formattedTime, 'formattedTime');

  return (
    airdrop && (
      <div className="w-full flex justify-center">
        <div className="w-full px-4 md:px-0 md:flex md:w-10/12 md:gap-7">
          <div className="w-full md:w-[65%] bg-white dark:bg-dark-1 rounded-[10px]">
            <Preview
              name={airdrop.info.description[7]}
              icon={airdrop.info.description[0]}
              is_private={airdrop.info.isPrivate}
              tags={['Web3', 'nn']}
              description={airdrop.info.description[1]}
              address={airdrop.address}
              tokenAddress={airdrop.info.token}
              starts_on={formattedTime}
              ends_on={airdrop.info.startTime.toNumber()}
              admin={admin}
            />
          </div>

          <div className="mt-14 md:mt-0 md:w-[35%] ">
        
            {
                admin ? <AdminPanel airdrop={airdrop} status={status} whitelist_address={airdrop.info.numberWLAddresses.toNumber()} participants={airdrop.info.numberOfParticipants.toNumber()} amount={totalAmount} allocated={1} showModal={showModal} upcoming={upcoming} Private={airdrop.info.isPrivate} started = {airdrop.started}/> : 
                <UserPanel amount={totalAmount} icon={airdrop.info.description[0]}
                min_allocation={airdrop.info[0].toNumber()} status={status}
                filled_percent={filledPerc} ends_on={airdrop.info[0].toNumber()}  
                whitelisted={whitelisted} whitelist_address={airdrop.info.numberWLAddresses.toNumber()} is_private={airdrop.info.isPrivate} remaining={remaining}/>
            }
          </div>
        </div>
      </div>
    )
  )
}
