import React from 'react'
import DribbleSVG from '../../../svgs/Socials/dribble'
import Options from '../../LockedAsset/Preview/Subcomponents/Options'
import TwitterSVG from '../../../svgs/Socials/twitter'
import EditSVG from 'svgs/edit'
import { Link } from 'react-router-dom'

export default function Info({ icon, name, is_private, tags, admin, airdrop }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-[54px] h-[54px]" />

        <div className=" ml-4">
          <div className="flex items-center">
            <h3 className=" font-bold dark:text-light-text">{name}</h3>
            {is_private && (
              <span className="ml-[10px] text-[10px] font-bold bg-[#E56060] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px]">
                Private
              </span>
            )}
          </div>

          <div className="flex items-center mt-2">
            {/* {tags.map((tag) => (
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

      {admin ?
        <div className='mb-2'>
          {/* <button className='flex rounded-md bg-primary-green bg-opacity-10 text-primary-green font-bold font-gilroy py-2.5 px-6 text-[16px] text-opacity-70'>
            <EditSVG className="mr-2"/> 
            Edit
        </button> */}
        </div>
        :
        <div className="flex items-center gap-5">
          <a href={airdrop.info.description[4]} target="_blank">
            <TwitterSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
          </a>
          <a href={airdrop.info.description[4]} target="_blank">
            <DribbleSVG className="fill-dark-text dark:fill-light-text hidden md:block" />
          </a>
          <Options width={'w-7'} height={'h-7'} color={'[#FAF8F5]'} dark_color={'dark-2'} />
        </div>
      }

    </div>
  )
}
