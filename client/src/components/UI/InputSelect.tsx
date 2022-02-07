import { IInputSelect } from './interfaces';
import './ui.scss';

const InputSelect = (props: IInputSelect) => {

  const handleChange = (e: any) => {
    props.changeHandler(e);
  }

  return (
    <>
      <select
        className='form-select'
        name={props.name}
        onChange={(e) => handleChange(e)}
      >
        <option selected value="">
          {props.label}      
        </option>
        {props.options.map((opt) => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
      </select>
    </>
  )
}

export default InputSelect;
