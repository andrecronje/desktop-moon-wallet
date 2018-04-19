import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignIn, verifySignIn } from '../../../redux/modules/auth/signIn';

import InitSignInForm from '../../../components/auth/InitSignInForm';
import VerifySignInForm from '../../../components/auth/VerifySignInForm';

import s from './styles.css';

const SignIn = (props) => {
  const {
    step,
    fetching,
    verification: {
      verificationId,
      method
    }
  } = props;

  const qp = queryString.parse(props.location.search);

  const renderStep = (s) => {
    if (qp.verificationId && qp.code) {
      return (
        <VerifySignInForm
          onSubmit={verifySignIn}
          fetching={fetching}
          initialValues={{
            verification: {
              verificationId: qp.verificationId,
              code: qp.code
            }
          }}
        />
      );
    }

    if (s === 'initSignIn') {
      return (
        <InitSignInForm
          onSubmit={initSignIn}
          fetching={fetching}
        />
      );
    }

    return (
      <VerifySignInForm
        onSubmit={verifySignIn}
        fetching={fetching}
        method={method}
        initialValues={{
          verification: { verificationId }
        }}
      />
    );
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        {renderStep(step)}
      </div>
      <div className={s.fp}>
        <Link to="/auth/reset-password">Forgot password?</Link>
      </div>
      <div className={s.bottomLink}>
        Not have an account?{' '}
        <Link to="/auth/sign-up">Sign up!</Link>
      </div>
    </div>
  );
};

const ComponentWithRouter = withRouter(SignIn);
export default connect((state) => ({
  ...state.auth.signIn
}))(ComponentWithRouter);
