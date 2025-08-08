import { useEffect, useState } from 'react';
import Avat from '../../../assets/images/avat.png'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MatchCard = ({ user }) => {
  const [userSkills, setUserSkills] = useState([]);
  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setUserSkills(user.hasSkills)
    }
  }, [user])

  return (
    user && <div className='p-4 mb-4   rounded-xl w-full usercard flex justify-between md:items-start md:flex-row flex-col'>
      <div className="info">
        <h3 className='font-medium text-[--color-text-primary] text-lg capitalize'>{user.name}</h3>
        {userSkills && <p className='font-medium text-[--color-text-secondary] capitalize'>
          {t("skills")}: {
            userSkills.map((skill, index) => {
              return index === userSkills.length - 1 ? skill.skillName : `${skill.skillName}, `
            })
          }
        </p>}
        <div 
          onClick={() => {navigate(`/schedule/${user.uid}`)}}
          className='flex justify-center items-center bg-[--color-btn-submit-bg] p-2 py-1 my-3 rounded-md w-fit dark:text-[--color-text-light] text-white/80 font-medium transition-all duration-300 cursor-pointer hover:bg-[--color-btn-submit-hover]'>
          {t("Schedule Session")}
        </div>
      </div>

      <img src={user.profilePicture || Avat} alt="avatar" className='w-[300px] h-[180px] object-cover rounded-md'/>
    </div>
  )
}
