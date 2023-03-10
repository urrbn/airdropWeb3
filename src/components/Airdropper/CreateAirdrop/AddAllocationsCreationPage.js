import React, {useState} from 'react'
import QuestionSVG from 'svgs/question'
import PrivateAirdropAbi from 'config/abi/PrivateAirdropAbi.json';
import { useEthers} from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { useModal } from 'react-simple-modal-provider'
import { parseUnits } from 'ethers/lib/utils'

export default function AddAllocationsCreation({decimals, airdropAddress, showModal}) {
  const [allocation, setAllocation] = useState("")
  const [error, setError] = useState()
  const [ready, setReady] = useState(false)
  const { account, library, chainId } = useEthers()   
  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')

  const handleSetAllocations = async () => {
    openLoadingModal()
    var allocationArray = allocation.split(/,|\n/);

    var addys = [],
        amounts = [],
        amountsBigNumber =[];

    for(var i=0; i<allocationArray.length; i++)
        (i % 2 == 0 ? addys : amounts).push(allocationArray[i]);

    for(var i=0; i<amounts.length; i++){
        var amount = parseUnits(amounts[i], decimals)
        amountsBigNumber.push(amount);
    }

    const contract = new Contract(airdropAddress, PrivateAirdropAbi, library.getSigner())
    try {
      const setAllocations = await contract.setAllocations(addys, amountsBigNumber)
      await setAllocations.wait()
      if(addys.length > 0){
          setReady(true)
          setAllocation('')
      }
      closeLoadingModal()
      setError(undefined);
      //navigate(`/locked-assets`)
      return
    } catch (error) {
      setError(error.reason);
      closeLoadingModal()
      return false
    }
  } 

  const handleStartAirdrop = () => {
     showModal(3)
  };
   



  return (
    <div className={`w-screen h-screen flex backdrop-blur-[7px] flex-col justify-center items-center bg-[#F2F3F5] dark:bg-dark dark:bg-opacity-40 bg-opacity-40`}>
      <div className="w-[90%] max-w-[420px] rounded-[10px] px-9 py-7 bg-white dark:bg-dark-1">
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">Set Allocations</span>
          <div className="flex items-center cursor-pointer" onClick={() => showModal(0)}>
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">Close</span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>

        <div className='mt-10'>
            <div className="w-full">
                <div className="flex items-center">
                    <span className="font-gilroy font-semibold text-gray dark:text-gray-dark">
                        Users Allocation
                    </span>
                    <QuestionSVG className="ml-2"/>
                </div>
                <div className="items-center rounded-lg border-[1.5px] border-dim-text border-opacity-50 mt-5">
                    <textarea
                        className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                        value={allocation}
                        onChange={(e) => setAllocation(e.target.value)}
                        placeholder={"0x5168C3d820A2a2521F907cD74F6E1DE43E95da22,1000"}
                    />
                </div>
                </div>
            </div>
      <div className="w-full max-w-[420px]  mt-10">
        {!ready &&<button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleSetAllocations}
        >
          Confirm
        </button>} 
        {ready && <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleSetAllocations}
        >
          Add More
        </button>}
      </div>

      <div className="w-full max-w-[420px]  mt-10">
        {ready && <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleStartAirdrop}
        >
          Proceed to Start
        </button>}
      </div>
      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
    </div>
    </div>
  )
}