import { faCertificate, faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Feature({ children, notIncluded, bold, verification }) {
  return <div className="flex gap-2 items-center px-5 mb-5">
    <FontAwesomeIcon icon={notIncluded ? faClose : faCheck} className={`${notIncluded ? "text-[var(--color-text-primary)]" : "text-[var(--main-color)]"}`}></FontAwesomeIcon>
    <div className={`font-bold ${notIncluded ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-primary)]"} text-base`}><span className="text-[var(--color-text-light)]">{bold}</span>{children} {verification && <FontAwesomeIcon icon={faCertificate} className="text-[#ffc107]"></FontAwesomeIcon>}</div>
  </div>
}
