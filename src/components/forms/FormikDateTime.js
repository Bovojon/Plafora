import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Input} from 'reactstrap';

const DATE_FORMAT = 'MM-dd-yyyy h:mm aa'

const FormikDateTime = ({field, form, timeFormat}) => {
    const onFieldChange = value => {
        let dateValue = value;
        if (value instanceof moment) {
            dateValue = moment(value).format();
        }
        form.setFieldValue(field.name, dateValue);
    }

    const onFieldBlur = () => {
        form.setFieldTouched(field.name, true);
    }

    return (
        <DatePicker 
            autoComplete="off"
            id={field.name}
            selected={
                typeof(field.value) === 'string' ?
                (moment(field.value).isValid() ? moment(field.value) : null)
                : 
                field.value
            }
            onBlur={onFieldBlur}
            dateFormat={DATE_FORMAT}
            onChange={onFieldChange}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            customInput={<CustomInput />}
        />
    );
}

const CustomInput = ({value, onClick}) => {
    return <Input onClick={onClick} value={value} onChange={() => null} />
};

export default FormikDateTime;