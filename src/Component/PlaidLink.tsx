
import React, {useEffect, useState} from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Swal from 'sweetalert2';
import UserService from '../services/user';


const PlaidLink = () => {

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

export default PlaidLink
