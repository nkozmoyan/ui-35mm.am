import styled from 'styled-components';
import { Input as FormInput } from './forms/Input';

const Group = styled.div`
  margin: 1em 0px;
`;

const Input = styled(FormInput)`
  display: block;
  width: 50%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight:400;
  line-height:1.5;
  border 1px solid #ced4da;
  border-radius:4px;
  color:#212529;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 1.2em;
`;

const FeedBack = styled.div`
  font-size: 1em;
  color: red;
`;

const Button = styled.button`
  padding: 0.375rem 0.75rem;
`;

export const Form = { Group, Input, Label, FeedBack, Button };
