import { useEffect, useState } from 'react';
import Avat from '../../../assets/images/avat.png'
import { getUserById } from '../../../utils/firestoreUtil';

export const MatchCard = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    getUserById(userId).then((res) => setUser(res.data()))
  }, [])

  useEffect(() => {
    if (user) {
      setUserSkills(user.hasSkills)
    }
  }, [user])

  return (
    user && <div className='p-4 mb-4 border-[--color-card-border] border-2 border-solid rounded-xl w-full bg-[--color-card-content-bg] flex justify-between md:items-start md:flex-row flex-col'>
      <div className="info">
        <h3 className='font-medium text-[--color-text-primary] text-lg capitalize'>{user.name}</h3>
        {userSkills && <p className='font-medium text-[--color-text-secondary] capitalize'>
          Skills: {
            userSkills.map((skill, index) => {
              return index === userSkills.length - 1 ? skill.skillName : `${skill.skillName}, `
            })
          }
        </p>}
        <div className='flex justify-center items-center bg-[--color-btn-submit-bg] p-2 py-1 my-3 rounded-md w-fit text-[--color-text-light] font-medium transition-all duration-300 cursor-pointer hover:bg-[--color-btn-submit-hover]'>
          View Profile
        </div>
      </div>

      <img src={user.profilePicture || Avat} alt="avatar" />
    </div>
  )
}
