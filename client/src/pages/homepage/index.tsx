import * as React from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TransactionContext } from "../../context/TransactionContext";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { connectedAccount,transactionCount, connectWallet, sendTransaction } =
    useContext(TransactionContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      addressTo: data.get("addressTo"),
      amount: data.get("amount"),
      keyword: data.get("keyword"),
      message: data.get("message"),
    });
    const addressTo = data.get("addressTo");
    const amount = data.get("amount");
    const keyword = data.get("keyword");
    const message = data.get("message");
    sendTransaction(addressTo, amount, keyword, message);
  };

  return (
    <ThemeProvider theme={theme}>
      {!connectedAccount && (
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={connectWallet}
        >
          Connect
        </Button>
      )}
      <div>{transactionCount}</div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Address To"
              name="addressTo"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Amount"
              name="amount"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Keyword"
              name="keyword"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Message"
              name="message"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Now
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
