const FormInput = ({label,name,type,Icon}) => {
  return (
      <label htmlFor={name} className="input input-bordered flex items-center gap-2 input-primary w-full">
        {Icon && <Icon/>}
        <input type={type} name={name} className="grow" placeholder={label || ""}id={name}/>
      </label>
  )
}
export default FormInput