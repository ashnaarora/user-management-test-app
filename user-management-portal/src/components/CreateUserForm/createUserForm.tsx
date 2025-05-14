import React, { useState } from "react";
import { Card, CardContent, Stack, Button, CardHeader } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";

interface CreateUserFormProps {
  onSubmit: (data: { firstName: string, lastName: string, email: string }) => void;
  onCancel: () => void;
}

const CreateUserForm = ({ onSubmit, onCancel }: CreateUserFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if(formErrors.firstName || formErrors.lastName || formErrors.email) {
      return;
    }

    onSubmit({ firstName, lastName, email });
  };

    const handleInputChange = (field: string, errors: string) => {
    setFormErrors({ ...formErrors, [field]: errors });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="userForm">
        <CardHeader title="Create User" />
        <CardContent>
          <Stack spacing={3}>
            <CustomInput
              label="First Name"
              required={true}
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              showIcon={true}
              iconType="person"
              validationRules={["required", "maxLength:100", "isAlpha"]}
              onBlur={handleInputChange}
            />
            <CustomInput
              label="Last Name"
              required={true}
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              showIcon={true}
              iconType="person"
              validationRules={["required", "maxLength:100", "isAlpha"]}
              onBlur={handleInputChange}
            />
            <CustomInput
              label="Email"
              required={true}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showIcon={true}
              iconType="email"
              validationRules={["required", "email"]}
              onBlur={handleInputChange}
            />
          </Stack>

          <Stack direction="row" spacing={1} className="form-buttons" justifyContent="flex-end">
            <Button variant="outlined" onClick={onCancel} >Cancel</Button>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateUserForm;
