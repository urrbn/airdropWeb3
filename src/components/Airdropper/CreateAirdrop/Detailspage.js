import React, { useState, useContext } from 'react'
import TwitterSVG from '../../../svgs/Socials/twitter'
import DribbleSVG from '../../../svgs/Socials/dribble'
import HeadingTags from '../../TokenLocker/Subcomponents/HeadingTags'
import UploadImageFlex from '../../Common/UploadImageFlex'
import PreviewHeader from 'components/Common/PreviewHeader'
import BackArrowSVG from '../../../svgs/back_arrow'
import LinkedinSVG from '../../../svgs/Socials/linkedin'
import { ThemeContext } from '../../../context/ThemeContext/ThemeProvider'
import GithubSVG from '../../../svgs/Socials/github'
import { isValidUrl } from '../../../utils/numberFormat'

export default function Detailspage({ setActive, setAirdropData, airdropData  }) {
  const [profileImage, setProfileImage] = useState(null)
  const [valid, setValid] = useState(false);
  const { theme } = useContext(ThemeContext)
  

  const handleSubmit = () => {
    //if(isValidUrl(airdropData.image) && isValidUrl(airdropData.website))
    setActive('Preview')
  }
 
  console.log(airdropData, 'airdropdata')

  return (
    <div className="w-full p-5 md:p-9 bg-white dark:bg-dark-1 rounded-[10px] ">
       <>
                <div className="flex items-center mt-9">
                  <HeadingTags name={'Token Logo'} required />
                  <img src="/images/lists/question.svg" alt="info" className="ml-2" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
                  <div className="flex items-center justify-between bg-[#FAF8F5] dark:bg-dark-2 px-5 py-4 rounded-md w-[100%]">
                    <input
                      type="text"
                      placeholder="Input Valid image url here"
                      className="w-[100%] font-bold text-dark-text dark:text-light-text"
                      value={airdropData.image}
                      onChange={(e) =>
                        setAirdropData((prevState) => ({
                          ...prevState,
                          image: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </>

      <div className="mt-10">
        <div className="flex items-center">
          <HeadingTags name={'Description'} required />
          <img src="/images/lists/question.svg" alt="info" className="ml-2" />
        </div>
        <div className="mt-5">
          <textarea
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={'text'}
            value={airdropData.description}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            placeholder="Describe about your project"
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center">
          <HeadingTags name={'Tags'} />
          <img src="/images/lists/question.svg" alt="info" className="ml-2" />
        </div>
        <div className="mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
            type={'text'}
            value={airdropData.tags}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                tags: e.target.value,
              }))
            }
            placeholder="Tags"
          />
        </div>
      </div>

        <PreviewHeader heading={'Social Details'} />
      <div className="mt-7">
        <HeadingTags name={'Website'} required />
        <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={'text'}
            value={airdropData.website}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                website: e.target.value,
              }))
            }
            placeholder="Enter website URL"
          />
          <DribbleSVG className="w-5 h-5 fill-dark-text dark:fill-light-text" />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={'Twitter'} />
        <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={'text'}
            value={airdropData.twitter}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                twitter: e.target.value,
              }))
            }
            placeholder="Enter your Twitter"
          />
          <TwitterSVG className="w-5 h-5 fill-dark-text dark:fill-light-text" />
        </div>
      </div>

      <div className="mt-7">
        <HeadingTags name={'Linkedin'} />
        <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={'text'}
            value={airdropData.linkedin}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                linkedin: e.target.value,
              }))
            }
            placeholder="Enter your Linkedin"
          />
          <LinkedinSVG
            className="w-5 h-5"
            outer={`${theme === 'dark' ? '#fff' : '#464754'}`}
            inner={`${theme === 'dark' ? '#464754' : '#fff'}`}
          />
        </div>
      </div>
      <div className="mt-7">
        <HeadingTags name={'Github'} />
        <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={'text'}
            value={airdropData.github}
            onChange={(e) =>
              setAirdropData((prevState) => ({
                ...prevState,
                github: e.target.value,
              }))
            }
            placeholder="Enter your Github"
          />
          <GithubSVG
            className="w-5 h-5"
            outer={`${theme === 'dark' ? '#fff' : '#464754'}`}
            inner={`${theme === 'dark' ? '#464754' : '#fff'}`}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive('Token Info')}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
          </button>

          <button
            className="bg-primary-green disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
            // disabled={address.length < 5}
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
