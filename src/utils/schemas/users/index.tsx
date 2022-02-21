import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
const usernameRegex = /^[a-zA-Z0-9]+$/;
const phoneRegexTest = /(07|08|09)[0-9]{9}$/ 

const email = () =>
  string().matches(emailRegex, 'Valid email required').required('Email is required');

export const userSchema = yupResolver(
    object().shape({
      email: email(),
      name: string()
        .matches(nameRegex, "Full Name is required and can't contain numbers")
        .required('Full Name  is required'),
      username: string()
        .matches(usernameRegex, 'Username is required, no special characters')
        .required('Username is required'),
      phone: string()
       .matches(phoneRegexTest, 'Valid phone number required, No space')
        .required('Phone number is required'),
    }),
  );