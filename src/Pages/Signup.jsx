import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  signuprequest,
  signupsuccess,
  signupfailure,
} from "../redux/Auth/AuthAction";
import { app, db } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useToast } from "@chakra-ui/react";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EMAIl_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const CAPTCHA_REGEX=/^[a-zA-Z0-9]{5}$/;

function Signup() {
  const auth = getAuth();
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkpass, setCheckPass] = useState(false);
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [captcha, setCaptcha] = useState("");
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [captchaFocus, setCaptchaFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

  // useEffect(() => {
  //   setValidName(USER_REGEX.test(user));
  // }, [user]);

  // useEffect(() => {
  //   setValidEmail(EMAIl_REGEX.test(email));
  // }, [email]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd));
  // }, [pwd]);

  // useEffect(() => {
  //   if (captcha.lenght == 5) {
  //     setValidCaptcha(validateCaptcha(captcha));
  //   }
  // }, [captcha]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, email, pwd, captcha]);

  const toast=useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signuprequest());
    const data = {
      username: user,
      email: email,
      password: pwd,
    };
    
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: data.username,
        })
          .then(() => {
            const { displayName, uid } = res.user;

            // console.log(displayName, uid);
            localStorage.setItem("name",displayName);
            dispatch(signupsuccess({ displayName, uid }));
            const docData = {
              address: {
                pincode: "",
                locality: "",
                city: "",
                state: "",
              },
              wishlist: [],
              bag: [],
              phone: "",
            };
            setDoc(doc(db, "users", `${res.user.uid}`), docData);
            toast({
              title: "Logged in",
              position: "bottom-center",
              duration: 1000,
              status: "success",
              isClosable: true,
            });
            setTimeout(() => {
              navigate("/");
            }, 1200);
          })
          .catch((error) => {
            toast({
              title: `${error.message}`,
              position: "bottom-center",
              duration: 1000,
              status: "success",
              isClosable: true,
            });
          });
      })
      .catch((err) => {
        dispatch(signupfailure());
        toast({
          title: `${err.message}`,
          position: "bottom-center",
          duration: 1000,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Formbg>
      <FormWrapper>
        <FormHead>
          <Button display={"block"} margin={"auto"} marginBottom={"5"}>Create your account</Button>
        </FormHead>
        <SignInform onSubmit={handleSubmit}>
          <div>
            <FromInputWrapper>
              <SignInput
                type="text"
                placeholder="Nick name"
                name="username"
                onChange={(e) => setUser(e.target.value)}
                ref={userRef}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </FromInputWrapper>
            {/* {userFocus && user && !validName ? (
              <label htmlFor="name">Please enter your name</label>
            ) : (
              ""
            )} */}
          </div>
          <div>
            <FromInputWrapper>
              <SignInput
                type="email"
                placeholder="Email address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </FromInputWrapper>
            {/* {emailFocus && email && !validEmail ? (
              <label htmlFor="email">Please enter a valid email address</label>
            ) : (
              ""
            )} */}
          </div>
          <div>
            <FromPasswordInputWrapper>
              <PasswordSignInput
                type={checkpass ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              {checkpass ? (
                <RxEyeOpen onClick={() => setCheckPass(false)} />
              ) : (
                <RxEyeClosed onClick={() => setCheckPass(true)} />
              )}
            </FromPasswordInputWrapper>
            {/* {pwdFocus && pwd && !validPwd ? (
              <label htmlFor="password">Please enter a valid password</label>
            ) : (
              ""
            )} */}
          </div>
          <CaptchaContainer>
            <div id="Captchadiv">
              <FromCaptchaInputWrapper>
                <CaptchaInput
                  placeholder="Enter Captcha"
                  onChange={(e) => setCaptcha(e.target.value)}
                  id="user_captcha_input"
                  name="user_captcha_input"
                  type="text"
                  required
                  aria-invalid={validCaptcha ? "false" : "true"}
                  aria-describedby="captchanote"
                  onFocus={() => setCaptchaFocus(true)}
                  onBlur={() => setCaptchaFocus(false)}
                />
              </FromCaptchaInputWrapper>
              {captchaFocus && captcha && validCaptcha ? (
                <label htmlFor="captcha">ReEnter the verification code</label>
              ) : (
                ""
              )}
            </div>
            <LoadCanvasTemplateNoReload />
          </CaptchaContainer>
          <SignInput
            id="submit"
            disabled={
              !validName || !validPwd || !validEmail || !validCaptcha
                ? false
                : true
            }
            type="submit"
          />

          <Orline>
            <span>or</span>
          </Orline>
            <Link to="/login"> <Button display={"block"} margin={"auto"}>Already registered ? Sign in</Button></Link>
          <Gdiv>
            <FcGoogle />
          </Gdiv>
        </SignInform>
      </FormWrapper>
    </Formbg>
  );
}

export default Signup;

const Formbg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  > #Captchadiv {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 12px;
      color: red;
      ::after {
        content: "*";
      }
    }
  }
`;

const BgImage = styled.img`
  width: 100%;
  height: 100%;
  border: none;
`;

const FromCaptchaInputWrapper = styled.div`
  border: 1.5px solid;
  width: 100%;
  height: 30px;
  padding: none;
  margin: none;
  > input {
    padding: 0;
    margin: 0;
  }
`;

const CaptchaInput = styled.input`
  width: 60%;
  height: 25px;
  text-align: center;
  border: none;
  outline: none;
`;

const FormWrapper = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  position: absolute;
  top: 7rem;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Gdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  > svg {
    height: 44px;
    width: 35px;
  }
`;

const Orline = styled.div`
  height: 20px;
  border-bottom: 1px solid #e6e7e8;
  position: relative;
  > span {
    font-size: 14px;
    width: 50px;
    color: #999;
    background-color: #fff;
    padding: 0 13px;
    margin-left: -21px;
    position: absolute;
    left: 50%;
    bottom: -9px;
    z-index: 2;
  }
`;

const SignInform = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;

  #submit {
    justify-self: center;
    align-self: center;
    color: antiquewhite;
    height: 44px;
    outline: none;
    text-align: center;
    line-height: 44px;
    cursor: pointer;
    background-color: #06f;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #06f;
    border-radius: 4px;
  }

  > div {
    text-align: left;
    > label {
      font-size: 12px;
      line-height: 0;
      color: red;
      ::after {
        content: "*";
      }
    }
  }
`;

const FromInputWrapper = styled.div`
  /* border:1.5px solid ; */
`;

const FromPasswordInputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-indent: 14px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* display: inline-block; */
`;

const FormHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > p {
    cursor: pointer;
  }
`;

const SignInput = styled.input`
  /* height: 25px;
    width: 95%; */
  outline: none;
  text-align: left;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-indent: 14px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
`;

const PasswordSignInput = styled.input`
  outline: none;
  width: 88%;
  line-height: 30px;
  text-indent: 14px;
  text-align: left;
  display: inline-block;
  border: none;
  box-sizing: border-box;
`;
