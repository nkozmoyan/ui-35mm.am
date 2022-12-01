import { useEffect, useState } from 'react';

export const inputState = function (initialValue = '') {
  this.value = initialValue;
  this.initialValue = initialValue;
  this.untouched = true;
  this.pristine = true;
  this.touched = false;
  this.dirty = false;
  this.valid = false;
  this.invalid = false;
  this.error = '';
};

export const Input = (props) => {
  const [inputElem, setValue] = useState(new inputState(props.value));

  useEffect(() => {
    if (props.onChange) {
      props.onChange(inputElem);
    } // eslint-disable-next-line
  }, [inputElem]);

  const { validatorFn, ...p } = props;

  return (
    <input
      {...p}
      value={inputElem.value}
      onFocus={(e) =>
        setValue((prev) => {
          return { ...prev, touched: true, untouched: false };
        })
      }
      onChange={(e) => {
        setValue((prev) => {
          let pristine = prev.pristine,
            dirty = prev.dirty,
            invalid = prev.invalid,
            valid = prev.valid,
            error = '';

          if (props.required && e.target.value === '') {
            valid = false;
            error = 'This field is required.';
          } else if (validatorFn) {
            valid = validatorFn(e.target.value);
            error = 'This field should contain only alphanumeric symbols.';
          }

          invalid = !valid;

          if (prev.pristine && e.target.value !== prev.initialValue) {
            pristine = false;
            dirty = true;
          }

          return {
            ...prev,
            value: e.target.value,
            pristine,
            dirty,
            invalid: invalid,
            valid: valid,
            error: error,
          };
        });
      }}
    />
  );
};
