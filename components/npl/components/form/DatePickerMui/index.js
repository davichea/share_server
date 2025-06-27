import React from 'react';
import { Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { preventEnter } from '@/lib/utils/inputUtils';
import { formatDate } from '@/lib/utils/dateUtils';
const DatePickerMui = ({ maxDate = dayjs(), disabled = false, name, control, rules = {}, error = false, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <DesktopDatePicker
          disabled={disabled}
          inputFormat="MM/DD/YYYY"
          value={value}
          maxDate={maxDate}
          {...props}
          onChange={(date) => onChange(formatDate(date))}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                // Entire component background color when disabled
                backgroundColor: disabled ? '#f3f4f6' : 'transparent', // Light gray for disabled state
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  color: disabled ? '#a0aec0' : '#1a202c', // Text color for disabled state
                },
                '& .MuiOutlinedInput-root': {
                  height: '42px',
                  borderRadius: '8px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(209, 213, 219)', // Default border color
                  },
                  // Disabled state border color
                  '&.Mui-disabled fieldset': {
                    borderColor: '#e2e8f0', // Light gray border for disabled
                  },
                  '&.Mui-disabled': {
                    borderRadius: '8px',
                    backgroundColor: '#f3f4f6',
                  },
                },
                // Disable the icon as well (adjust color and disable interaction)
                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: disabled ? '#a0aec0' : '', // Light gray for disabled icon
                  pointerEvents: disabled ? 'none' : 'auto', // Prevent interaction with the icon when disabled
                },
              }}
              variant="outlined"
              size="small"
              error={error}
              className="w-full"
              placeholder="MM/DD/YYYY"
              inputProps={{
                readOnly: true, // Prevent typing completely
              }}
              value={value ? dayjs(value).format('MM/DD/YYYY') : ''}
              disabled={disabled} 
              onKeyDown={preventEnter}
            />
          )}
        />
      )}
    />
  );
};

export default DatePickerMui;
