import { FACTORY_ADDRESS, MULTICALL_ADDRESS, RPC_ADDRESS } from '../config/constants/address'
import PublicAirdropAbi from 'config/abi/PublicAirdropAbi.json'
import PrivateAirdropAbi from 'config/abi/PrivateAirdropAbi.json'
import AirdropFactoryAbi from 'config/abi/AirdropFactory.json'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import { DEFAULT_CHAIN, TOTAL_DATA_DISPLAY } from 'config/constants/misc'
import { useEthers} from '@usedapp/core'

const CHAIN_NUMBER = DEFAULT_CHAIN

export const sortAirdrops = async (airdrops) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  let started = [];
  let ended = [];
  let timed = [];

  try{
  
    for(let i = 0; i < airdrops.length; i++ ){
      const airdropContract = new Contract(airdrops[i], PrivateAirdropAbi);
      let calls = []
      calls.push(airdropContract.airDropStarted())
      const isStarted = await ethcallProvider.all(calls)
      
      if(isStarted[0] === true){
        started.push(airdrops[i])
      }else{
        timed.push(airdrops[i])
      }
    
    }
    
  
    for(let i = 0; i < started.length; i++ ){
      const airdropContract = new Contract(started[i], PrivateAirdropAbi);
      let calls = []
      calls.push(airdropContract.airdropEmpty())
      calls.push(airdropContract.airdropCancelled())
      const res = await ethcallProvider.all(calls)
      if(res[0] || res[1]){
        ended.push(started[i])
      }
    }
  
    let live = started.filter( x => !ended.includes(x) );
    return {
      success: true,
      data: { 
        timed: timed,
        live: live,
        ended: ended
      },
    }
    
  }catch (error){
    console.log(error.message)
    return {
      success: false
    }
  }
  
}

export const getAirdropStatus = async (address) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()
  let calls = []
  console.log(address, 'addr')
  const contract = new Contract(address[0], PrivateAirdropAbi)
  calls.push(contract.airDropStarted())
  calls.push(contract.airdropEmpty())
  calls.push(contract.airdropCancelled())
  
  let result = []
  try {
    const resCall = await ethcallProvider.all(calls)
    let a = 0
    let b = 1
    
    const res = {
      airDropStarted: resCall[0],
      isEmpty: resCall[1],
      airdropCancelled: resCall[2],
    }
    result.push(res)
      

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      data: result,
    }
  }
}

export const getUserParticipationPrivate = async (address, account) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()
  let calls = []
  console.log(address, 'addr')
  const contract = new Contract(address, PrivateAirdropAbi)
  calls.push(contract.isWL(account))
  calls.push(contract.userToParticipation(account))
  
  let result = []
  try {
    const resCall = await ethcallProvider.all(calls)
    
    const res = {
      isWL: resCall[0],
      participation: resCall[1]
    }
    result.push(res)
      

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      data: result,
    }
  }
}

export const getUserParticipationPublic = async (address, account) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()
  let calls = []
  console.log(address, 'addr')
  const contract = new Contract(address, PublicAirdropAbi)
  calls.push(contract.isAirdropClaimed(account))
  calls.push(contract.portionSize())
  
  let result = []
  try {
    const resCall = await ethcallProvider.all(calls)
    
    const res = {
      isAirdropClaimed: resCall[0],
      portionSize: resCall[1]
    }
    result.push(res)
      

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      data: result,
    }
  }
}

export const getAirdropInfos = async (address) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()
  let calls = []
  for (let i = 0; i < address.length; i++) {
    const tokenContract = new Contract(address[i], PrivateAirdropAbi)
    calls.push(tokenContract.getInfo())
    calls.push(tokenContract.owner())
  }
  let result = []
  try {
    const resCall = await ethcallProvider.all(calls)
    let a = 0
    let b = 1
    for (let i = 0; i < address.length; i++) {
      const res = {
        address: address[i],
        info: resCall[a],
        owner: resCall[b],
      }
      result.push(res)
      a = a + 2
      b = b + 2
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      data: result,
    }
  }
}


export const getAirdropList = async () => {
  let START = 0,
    END = 0
  try {
    const totalData = await getTotalAirdrop()
    console.log(totalData.data.number, 'totalData');
    //console.log(TOTAL_DATA_DISPLAY, 'TOTAL_DATA_DISPLAY');

    if (totalData.success) {
      if (totalData.data.number < TOTAL_DATA_DISPLAY) {
        console.log(TOTAL_DATA_DISPLAY, 'TOTAL_DATA_DISPLAY');
        START = 0
        END = totalData.data.number
        console.log(END, 'END');
      } else {
        //console.log(END, 'END');
        END = totalData.data.number >= TOTAL_DATA_DISPLAY ? totalData.data.number : TOTAL_DATA_DISPLAY
        console.log(END, 'END');
        START = totalData.data.number >= TOTAL_DATA_DISPLAY ? totalData.data.number - TOTAL_DATA_DISPLAY : 0
        console.log(START, 'START');
      }
    }
  } catch (error) {
    console.log(error.message)
    return {
      success: false,
      data: {},
    }
  }

  //setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  const tokenContract = new Contract('0xFEB0519C0eC588300146EA30133209aABD069432', AirdropFactoryAbi)
  
  try {
    const tokenCall = await tokenContract.getAllAirdrops(START, END)
    const [token] = await ethcallProvider.all([tokenCall]);
    return {
      success: true,
      data: token,
    }
  } catch (error) {
    return {
      success: false,
      data: {},
    }
  }
}


export const getTotalAirdrop = async () => {
  //setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()


  const tokenContract = new Contract('0xFEB0519C0eC588300146EA30133209aABD069432', AirdropFactoryAbi)
  
  try {
    const numberCall = await tokenContract.getNumberOfAirdropsDeployed()
    const [number] = await ethcallProvider.all([numberCall]);
    console.log(number, 'number')
    return {
      success: true,
      data: { number: number.toNumber()},
    }
  } catch (error) {
    console.log(error.message)
    return {
      success: false,
      data: { token: 0 },
    }
  }
}

