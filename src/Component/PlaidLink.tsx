/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UserService from '../services/user';
import * as Types from '../store/types';

type State = {}
type Props = {
  // eslint-disable-next-line no-unused-vars
  updatePlaidAccessToken: (plaidAccessToken: string) => void
}

function PlaidLink(props: Props) {
  const [linkToken, setLinkToken] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken]: any = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    UserService.getLinkToken(accessToken)
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.data.token) {
          setLinkToken(res.data.token);
        } else {
          return Swal.fire({
            title: 'Error',
            text: 'Please log in again!',
          });
        }
      });
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    env: 'development',
    // eslint-disable-next-line no-unused-vars
    onSuccess: (public_token, metadata) => {
      UserService.exchangePublicTokenForAccesstoken(accessToken, public_token)
        .then((res) => {
          if (res.data.accessToken) {
            // eslint-disable-next-line react/destructuring-assignment
            props.updatePlaidAccessToken(res.data.accessToken);
            localStorage.setItem('plaidAccessToken', res.data.accessToken);
            return Swal.fire({
              title: 'Success',
              text: 'Bank account linked',
            });
          }

          return Swal.fire({
            title: 'Error',
            text: 'Unable to link accounts',
          });
        });
    },
  });

  return (
    <button onClick={() => open()} disabled={!ready} type="button">
      Connect a bank account
    </button>
  );
}

const mapStateToProps = (state: State) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({

  updatePlaidAccessToken: (plaidAccessToken: string) => dispatch({
    type: Types.UPDATE_PLAID_ACCESS_TOKEN,
    payload: {
      plaidAccessToken,
    },
  }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(PlaidLink);
