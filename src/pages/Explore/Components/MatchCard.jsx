import Avat from '../../../assets/images/avat.png'

export const MatchCard = () => {
  return (
    <div className='p-4 border-[--color-card-border] border-2 border-solid rounded-xl w-full bg-[--color-card-content-bg] flex justify-between md:items-start md:flex-row flex-col'>
      <div className="info">
        <h3 className='font-medium text-[--color-text-primary] text-lg'>Sarah M.</h3>
        <p className='font-medium text-[--color-text-secondary]'>
          Skills: Photography, Graphic Design | Shared Interests: Travel, Art
        </p>
        <div className='flex justify-center items-center bg-[--color-btn-submit-bg] p-2 py-1 my-3 rounded-md w-fit text-[--color-text-light] font-medium transition-all duration-300 cursor-pointer hover:bg-[--color-btn-submit-hover]'>
          View Profile
        </div>
      </div>

      <img src={Avat} alt="avatar" />
    </div>
  )
}
