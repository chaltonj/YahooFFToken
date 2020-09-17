import {
    Button,
    TextField
    }
    from '@material-ui/core';
import * as React from 'react';
import * as qs from 'qs';
import axios from 'axios';

interface IGetTokenState {
    token: string
}
const redirectUri = "https://lemon-dune-0cd4b231e.azurestaticapps.net";
const loginTitle = "Login with Yahoo! for Read Access";
const loginUrl = "https://api.login.yahoo.com/oauth2/request_auth_fe?response_type=code&state=&client_id=dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5&scope=&redirect_uri=" + redirectUri;
const clientId = "dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5";
const clientSecret = "secret";
const getTokenUrl = "https://api.login.yahoo.com/oauth2/get_token?client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=authorization_code&code=gkthgdm&redirect_uri=https://localhost:3000";
// const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";
// headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
// },
export default class GetLink extends React.Component<any, IGetTokenState> {

    constructor(props: any) {
        super(props);
        let queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        if (queryParams.code) {
            this.get_token(queryParams.code.toString());
        }
        
        this.state = {
            token: "blah"
        };
    }

    private get_token = (code: string) => {
        console.log("getting token");
        console.log(code);
        axios.get('/api/GetToken', {
            params: {
              code: code
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    public render() {
        return (
            <div>
                <Button variant="contained" color="primary" href={loginUrl}>
                    {loginTitle}
                </Button>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax={4}
                    value={this.state.token}
                    variant="filled"
                    />
            </div>
        );
    }
}