
import React, {useEffect, useState} from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Swal from 'sweetalert2';
import UserService from '../services/user';
import { connect } from "react-redux";
import * as Types from '../store/types'
import { Dispatch } from 'redux';

type State = {}
type Props = {
  updatePlaidAccessToken: (plaidAccessToken: string) => void
}

const PlaidLink = (props: Props) => {
  const [linkToken, setLinkToken] = useState('')
  const [accessToken, setAccessToken]: any = useState(localStorage.getItem('accessToken'))

  useEffect(() => {
    UserService.getLinkToken(accessToken)
      .then((res) => {
        if (res.data.token) {
          setLinkToken(res.data.token)
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Please log in again!'
          })
        }
      })
  }, [])

    const { open, ready } = usePlaidLink({
      token: linkToken,
      env: 'development',
      onSuccess: (public_token, metadata) => {

        UserService.exchangePublicTokenForAccesstoken(accessToken, public_token)
          .then((res) => {
            if (res.data.accessToken) {
              props.updatePlaidAccessToken(res.data.accessToken)
              localStorage.setItem('plaidAccessToken', res.data.accessToken)
              return Swal.fire({
                title: 'Success',
                text: 'Bank account linked'
              })
            }
            else {
              return Swal.fire({
                title: 'Error',
                text: 'Unable to link accounts'
              })
            }
          })
      },
    });
    
    return (
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    )

}

const mapStateToProps = (state: State )=> state;
const mapDispatchToProps = (dispatch: Dispatch) => ({

  updatePlaidAccessToken: (plaidAccessToken: string) => dispatch({
    type: Types.UPDATE_PLAID_ACCESS_TOKEN, payload: {
      plaidAccessToken
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(PlaidLink);
