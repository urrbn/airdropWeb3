import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import BaseLayout from '../../components/BaseLayout/BaseLayout'
import AirdropPageBase from '../../components/Airdropper/AirdropPage'
import AddAllocations from 'components/Airdropper/AirdropPage/Modal/AddAllocations'
import RemoveAllocations from 'components/Airdropper/AirdropPage/Modal/RemoveAllocations'
import StartPrivateAirdrop from '../../components/Airdropper/AirdropPage/Modal/StartPrivateAirdrop'
import StartPublicAirdrop from '../../components/Airdropper/AirdropPage/Modal/StartPublicAirdrop'
import { getAirdropInfos, getAirdropStatus } from 'utils/getAirdropList'
import { useEthers} from '@usedapp/core'
import useAirdropOwner from 'hooks/useAirdropOwner'
import useIsOwner from 'hooks/useIsOwner'
import useTokenInfo from 'hooks/useTokenInfo'
import useTokenDecimals from 'hooks/useTokenDecimals'



export default function PoolPage() {
  const [modal, showModal] = useState(0);
  //const [admin] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [status, setStatus] = useState('k')
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState()
  const navigate = useNavigate();
  const { active, account, library, chainId } = useEthers();
  

  const owner = useAirdropOwner(id)
  const isOwner = useIsOwner(id, account);
  


  useEffect(() => {

    if(isOwner){
      setAdminMode(true)
    }else{
      setAdminMode(false)
    }
    
    
  }, [owner])


  useEffect(() => {
    if (asset) {
    console.log(asset, 'asset.name') 
    }
  }, [asset])

  useEffect(() => {
    let activated = true
    const handleFetch = async () => {
      setAsset(false)
      try {
        const info = await getAirdropInfos([id])
        setToken(info.data[0].info.token)
        const statuses = await getAirdropStatus([id])
        const isStarted = statuses.data[0].airDropStarted;
        const isEmpty = statuses.data[0].isEmpty;
        const isCancelled = statuses.data[0].airdropCancelled;

        console.log(isStarted, 'isStarted')
        console.log(isEmpty, 'isEmpty')
        console.log(isCancelled, 'isCancelled')
        console.log(statuses.data[0], 'statuses.data[0]')

        // if(active){
        //   if(owner === account){
        //     setAdminMode(true)
        //   }
        // }

        if(isStarted === true && (!isEmpty && !isCancelled)){
          setStatus('Live')
          
        }

        if(isStarted === false && isEmpty === false  && isCancelled === false){
          setStatus('Timed')
        }

        if(isEmpty === true || isCancelled === true){
          setStatus('Ended')
        }

        if (!activated) {
          return
        }
        if (info.success) {
          setAsset(info.data[0])

          document.title = info.data[0].info.description[7]
          setReady(true)
          return
        } else {
          navigate('/airdropper/airdrops')
        }
        
        if (!activated) {
          return
        }
      } catch (error) {
        console.log(error.message)
        console.log('message')
      }
    }
    handleFetch(id)
    
    return () => {
      activated = false
    }
  }, [id, navigate])

  
  return (
    ready ? (
    <div className='w-full'>
      {modal !== 0 &&
        <div className="fixed z-50  top-0 left-0">
          {modal === 1 && <AddAllocations decimals={18} tokenAddress={token} showModal={showModal}/>} 
          {modal === 2 && <RemoveAllocations showModal={showModal}/>} 
          {modal === 3 && <StartPrivateAirdrop decimals={18} tokenAddress={token}  showModal={showModal} modal={modal}/>}
          {modal === 4 && <StartPublicAirdrop decimals={18} tokenAddress={token}  showModal={showModal} modal={modal}/>}
        </div>
      }
      <BaseLayout page_name={'Airdrops'} title={asset.info.description[7]} subpage admin={adminMode} setAdminMode={setAdminMode}>
        <AirdropPageBase status={status} airdrop={asset} showModal={showModal} admin={adminMode} owner={owner}/>
      </BaseLayout>
    </div>
    ) : (
      <></>
    )

  )
}
