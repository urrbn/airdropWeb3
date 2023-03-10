import PublicAirdropAbi from '../config/abi/PublicAirdropAbi.json'
import PrivateAirdropAbi from '../config/abi/PrivateAirdropAbi.json'
import { Contract } from '@ethersproject/contracts'
import {utils, constants, BigNumber, Contract as CTR} from 'ethers';

import { useCall, useEthers } from "@usedapp/core"


function useAirdropInfo(airdropAddress) {

  const { value, error } =
    useCall(
      {
        contract: new Contract(airdropAddress, PublicAirdropAbi),
        method: "airdropInfo",
        args: [],
      },
      {
        refresh: "never",
      }
    ) ?? {}
  if (error) {
    
    return error
  }
  return value
}

export default useAirdropInfo