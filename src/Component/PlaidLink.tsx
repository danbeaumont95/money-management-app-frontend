/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UserService from '../services/user';
import * as Types from '../store/types';
// import PlaidLinkImage from '../Images/PlaidLink.png';
import PlaidLinkImage from '../Images/PlaidLink.webp';

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
    <div className="allPlaidLinkContent">
      <h2>Link your bank accounts!</h2>
      <h4>
        By clicking the below button, you will be
        taken through our open banking service providers (Plaid) pop up web app.
        This is fully secure, and has all the UK&#39;s major banking companies for
        you to link all of your bank accounts to Dans Money.
      </h4>
      <img src={PlaidLinkImage} alt="link" />
      <div className="connectBankAccountContainer">

        <button onClick={() => open()} disabled={!ready} type="button" className="linkPlaidAccount">
          Connect a bank account
        </button>
      </div>
    </div>
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
