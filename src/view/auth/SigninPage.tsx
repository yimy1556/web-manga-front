import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import Wrapper from 'src/view/auth/styles/Wrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Button,
} from '@material-ui/core';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

function SigninPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const [initialValues] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        values.email,
        values.password,
        values.rememberMe,
      ),
    );
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${'/images/signin.jpg'})`,
      }}
    >
      <Content>
        <Logo>
            <h1>{i18n('app.title')}</h1>
        </Logo>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              name="email"
              label={i18n('user.fields.email')}
              autoComplete="email"
              autoFocus
              externalErrorMessage={externalErrorMessage}
            />

            <InputFormItem
              name="password"
              label={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={'rememberMe'}
                    name={'rememberMe'}
                    defaultChecked={true}
                    inputRef={form.register}
                    color="primary"
                    size="small"
                  />
                }
                label={i18n('user.fields.rememberMe')}
              />
            </Box>

            <Button
              style={{ marginTop: '8px' }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {i18n('auth.signin')}
            </Button>
          </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
}

export default SigninPage;
