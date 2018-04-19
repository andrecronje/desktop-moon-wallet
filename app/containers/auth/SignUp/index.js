import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignUp, verifySignUp } from '../../../redux/modules/auth/signUp';

import InitSignUpForm from '../../../components/auth/InitSignUpForm';
import VerifySignUpForm from '../../../components/auth/VerifySignUpForm';

import s from './styles.css';

const SignUp = (props) => {
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
        <VerifySignUpForm
          onSubmit={verifySignUp}
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

    if (s === 'initSignUp') {
      return (
        <InitSignUpForm
          onSubmit={initSignUp}
          fetching={fetching}
        />
      );
    }

    return (
      <VerifySignUpForm
        onSubmit={verifySignUp}
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
      <div className={s.bottomLink}>
        Already have account?{' '}
        <Link to="/auth/sign-in">Sign in!</Link>
      </div>
    </div>
  );
};

const ComponentWithRouter = withRouter(SignUp);
export default connect((state) => ({
  ...state.auth.signUp
}))(ComponentWithRouter);
