import "./signIn.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn() {
  const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const emailRegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ///component
  const Error = ({ field }) => {
    const errorMsg = formik.errors[field];
    return <p className="error">{errorMsg}</p>;
  };

  ///component
  const Success = ({ field }) => {
    if (formik.touched[field]) {
      return <p className="success">Success</p>;
    }
  };

  const validate = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(15, "At least 15 character")
        .required("Required"),

      phone: Yup.string()
        .matches(phoneRegExp, "Invalid phone number")
        .required("Phone number is required"),

      email: Yup.string()
        .matches(emailRegExp, "Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "At least 6 character")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Password not match"),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1>Register</h1>
        <div
          className={`inputField username ${
            validate("username") ? "error" : null
          }`}
        >
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <span></span>
          {validate("username") ? (
            <Error field={"username"} />
          ) : (
            <Success field={"username"} />
          )}
        </div>
        <div
          className={`inputField phone ${validate("phone") ? "error" : null}`}
        >
          <input
            placeholder="Phone"
            type="tel"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <span></span>
          {validate("phone") ? (
            <Error field={"phone"} />
          ) : (
            <Success field={"phone"} />
          )}
        </div>
        <div
          className={`inputField email  ${validate("email") ? "error" : null}`}
        >
          <input
            placeholder="Email"
            type="e mail"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <span></span>
          {validate("email") ? (
            <Error field={"email"} />
          ) : (
            <Success field={"email"} />
          )}
        </div>
        <div
          className={`inputField password  ${
            validate("password") ? "error" : null
          }`}
        >
          <input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="false"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <span></span>
          {validate("password") ? (
            <Error field={"password"} />
          ) : (
            <Success field={"password"} />
          )}
        </div>
        <div
          className={`inputField confirm  ${
            validate("confirmPassword") ? "error" : ""
          }`}
        >
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="false"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <span></span>
          {validate("confirmPassword") ? (
            <Error field={"confirmPassword"} />
          ) : (
            <Success field={"confirmPassword"} />
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
