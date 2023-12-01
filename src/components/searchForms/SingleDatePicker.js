import React, { useState } from 'react';
import { Tooltip, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';

const SingleDatePicker = React.memo(({ value, onDateChange }) => {
  const [isValid, setIsValid] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const startDate = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
  const endDate = dayjs().format('YYYY-MM-DD');
  const limitDate = '2017-08-01';

  const onChangeHandler = (date) => {
    onDateChange(date.format('YYYY-MM-DD'))
  }


  return (
    <Tooltip title="April 2017-08-01" open={!isValid && isFocus}>
      <Space direction="vertical">
        <DatePicker
          placeholder="기간 입력"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          style={{ 
            minWidth: 150,
            minHeight: 48,
            fontFamily: 'NEXON',
            borderRadius: 20
        }}
          size={100}
          value={value ? (value) : null}
          status={!isValid && isFocus ? 'error' : ''}
          onChange={onChangeHandler}
        />
      </Space>
    </Tooltip>
  );
});

export default SingleDatePicker;