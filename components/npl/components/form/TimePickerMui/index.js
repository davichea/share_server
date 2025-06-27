import React from 'react';
import { Controller } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const TimePickerMui = ({ disabled = false, name, control, rules = {}, error = false,...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TimePicker
          {...props}
          disabled={disabled}
          value={value ? dayjs(value, 'HH:mm') : null}
          onChange={(newValue) => {
            const formattedTime = newValue ? dayjs(newValue).format('HH:mm') : null;
            onChange(formattedTime);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                backgroundColor: disabled ? '#f3f4f6' : 'transparent',
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  color: disabled ? '#a0aec0' : '#1a202c',
                },
                '& .MuiOutlinedInput-root': {
                  height: '43px',
                  borderRadius: '5px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(209, 213, 219)',
                  },
                  '&.Mui-disabled fieldset': {
                    borderColor: '#e2e8f0',
                  },
                },
                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: disabled ? '#a0aec0' : '',
                  pointerEvents: disabled ? 'none' : 'auto',
                },
              }}
              variant="outlined"
              size="small"
              error={error}
              className="w-full"
              disabled={disabled}
              inputProps={{
                ...params.inputProps,
                readOnly: true, // Prevent manual typing
              }}
            />
          )}
        />
      )}
    />
  );
};

export default TimePickerMui;
