const style = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: #cfcfcf;
}

.containers {
  background: #fff;
  height: 100vh;
  margin: 0 20vw;
  padding: 30px;
  .title {
    padding: 20px 0 30px;
    font-size: 2em;
    text-align: center;
  }
  .form-controller {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 5vw;
    padding: 20px;
    .input-controller {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-bottom: 20px;

      label {
        font-size: 1.2em;
      }
      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;

        &:focus {
          outline: 2px solid rgb(140, 181, 252);
        }
      }
    }
  }
  .btn {
    padding: 10px;
    font-size: 1.2em;
  }
  .btn-submit {
    background: #4caf50;
    color: #fff;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    &:hover {
      background: #45a049;
    }
  }
}

.centered {
  text-align: center;
  margin-top: 20px;
  a {
    text-decoration: none;
    color: #3e4ad3;
  }
}


@media screen and (min-width: 768px) {
  .containers{
    margin: 0 20vw;
  }
}

`

const form = (id) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Day-to-day Expenses</title>
    <link rel="stylesheet" href="../../Public/css/auth.css" />
    <style>
        ${style}
    </style>    
  </head>
  <body>
    <div class="containers">
      <h1 class="title">Set new password</h1>
      <form
        action="/password/update-password"
        method="post"
        class="form-controller"
      >
      <div class="input-controller">
                <label for ="email">Email :</label>
                <input type="email" id="email" name="email" required/>
            </div>
        <div class="input-controller">
          <label for="newPassword">Enter New Password:</label>
          <input type="password" id="newPassword" name="newPassword" required />
        </div>
        <button type="submit" class="btn btn-submit">Submit</button>
      </form>
    </div>
    <script src="../Public/UpdatePassword.js"></script>
  </body>
</html>
`

module.exports = form;