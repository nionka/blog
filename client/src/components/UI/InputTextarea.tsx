import { ITextarea } from "./interfaces";

const InputTextarea = (props: ITextarea) => {
  const handleChange = (e: any) => {
    props.changeHandler(e);
  }

  const stylesAll = [
    'form-textarea',
    props?.customCssClass ? props.customCssClass : '',
  ].join(' ');

  return (
    <>
      <textarea
        className={stylesAll}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => handleChange(e)}
      />
      {props.error && (
        <p style={{color: 'red', paddingLeft: '10px', marginTop: '10px'}}>{props.error}</p>
      )}
    </>
  )
}

export default InputTextarea;
