import React, { useState } from 'react'
import { ErrorMessage, useField } from 'formik'

const FieldInput = ({
                      label,
                      id = '',
                      // inline = true,
                      fieldClass = '',
                      type = 'text',
                      ...props
                    }) => {
  // const [field, meta, _] = useField(props)
  const [field, meta, ] = useField(props)
  const [focus, setFocus] = useState(false)
  const handleFocus = (e) => {
    // console.log("handleFocus", e.type);
    field.onBlur(e)
    switch (e.type) {
      case 'blur':
        setFocus(false)
        // if (meta.value === "" || meta.value === undefined) setFocus(false);
        break
      case 'focus':
        setFocus(true)
        break
      default:
        setFocus(focus)
    }
  }

  // if (meta.error && field.name === "email") {
  //   console.log("FIELD:", field);
  //   console.log("META:", meta);
  //   console.log("focus:", focus);
  // }
  // console.log("HELPER:", helper);
  // console.log("=======================================");

  const hasError = meta.error && !focus
  const hasData = meta.value !== '' && meta.value !== undefined

  return (
    <div className={`form-wrap ${hasError ? 'has-error' : ''}`}>
      <input
        {...field}
        id={id}
        type={type}
        onFocus={handleFocus}
        onBlur={handleFocus}
        className={`form-input form-control-has-validation ${fieldClass}`}
      />
      <label
        className={`form-label rd-input-label ${
          !focus && !hasData ? '' : 'focus'
        }`}
        htmlFor={id}
      >
        {label}
      </label>

      {hasError && (
        <ErrorMessage
          data-testid={id}
          name={field.name}
          component="span"
          className="form-validation"
        />
      )}
    </div>
  )
}

export default FieldInput