import { Card, CardContent, TextField, InputAdornment, Stack, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/PersonOutlineTwoTone';
import EmailIcon from '@mui/icons-material/EmailTwoTone';
import InfoIcon from '@mui/icons-material/InfoOutlineTwoTone';
import { useState } from "react";
import { validateField } from "../../utils/validationRules";

interface CustomInputProps {
    label: string;
    value: string;
    required?: boolean;
    name: string;
    placeholder?: string;
    showIcon?: boolean;
    iconType?: string;
    validationRules?: string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur? : (field: string, errors: string) => void;
}

const iconMap = (iconType: string | undefined): React.ReactElement | null => {
    if(iconType === "person") {
        return <PersonIcon />;
    } else if(iconType === "email") {
        return <EmailIcon />; 
    }
    else {
        return <InfoIcon />;
    }
}

const CustomInput = (props: CustomInputProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { label, name, required, placeholder, showIcon, iconType, validationRules = [], value, onChange, onBlur } = props; 

  const validateInput = (value: string, validationRules: string[], name: string, label: string) => {
    if(validationRules && validationRules.length > 0) {
        const result = validateField(value, validationRules, label);
        setErrorMessage(result);
        if(onBlur){
          onBlur(name, result);
        } 
    }
  }

  const startAdornment =
    showIcon ? (
      <InputAdornment position="start">
        {iconMap(iconType)}
      </InputAdornment>
    ) : null;

  const inputSlotPropsOrInputProps = startAdornment 
    ? { input: { startAdornment } }
    : {};

  return (
    <>
    <TextField
      label={label}
      required={required}
      name={name}
      placeholder={placeholder}
      slotProps={inputSlotPropsOrInputProps}
      value={value}
      onChange={onChange}
      onBlur={() => validateInput(value, validationRules, name, label)}
    />
    {errorMessage && <span className="error-message">{errorMessage}</span>}
    </>
  );
};

export default CustomInput;