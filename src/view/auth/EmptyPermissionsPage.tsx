import MaterialLink from '@material-ui/core/Link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';

function EmptyPermissionsPage(props) {
  const dispatch = useDispatch();

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          '/images/emptyPermissions.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
            <h1>{i18n('app.title')}</h1>
        </Logo>

        <h3>{i18n('auth.emptyPermissions.message')}</h3>

        <OtherActions>
          <MaterialLink
            component="button"
            onClick={doSignout}
          >
            {i18n('auth.signout')}
          </MaterialLink>
        </OtherActions>
      </Content>
    </Wrapper>
  );
}

export default EmptyPermissionsPage;
