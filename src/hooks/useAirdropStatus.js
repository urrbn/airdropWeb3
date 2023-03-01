import PublicAirdropAbi from '../config/abi/PublicAirdropAbi.json'
import PrivateAirdropAbi from '../config/abi/PrivateAirdropAbi.json'
import { Contract } from '@ethersproject/contracts'
import {utils, constants, BigNumber, Contract as CTR} from 'ethers';

import { useCall, useEthers } from "@usedapp/core"


export function useAirdropIsCancelled(airdropAddress) {

  const { value, error } =
    useCall(
      {
        contract: new Contract(airdropAddress, PublicAirdropAbi),
        method: "airdropCancelled",
        args: [],
      },
      {
        refresh: "never",
      }
    ) ?? {}
  if (error) {
    console.log(error.message, 'errr')
    return error
  }
  return value
}

export function useAirdropIsEmpty(airdropAddress) {

    const { value, error } =
      useCall(
        {
          contract: new Contract(airdropAddress, PublicAirdropAbi),
          method: "airdropEmpty",
          args: [],
        },
        {
          refresh: "never",
        }
      ) ?? {}
    if (error) {
      console.log(error.message, 'errr')
      return error
    }
    return value
}

export function useAirdropIsStarted(airdropAddress) {

    const { value, error } =
      useCall(
        {
          contract: new Contract(airdropAddress, PublicAirdropAbi),
          method: "airDropStarted",
          args: [],
        },
        {
          refresh: "never",
        }
      ) ?? {}
    if (error) {
      console.log(error.message, 'errr')
      return error
    }
    return value
}

