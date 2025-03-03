import { Link } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LogingArea = ({ style }: any) => {

   return (
      <section className="eg-login__area pt-140 pb-140 p-relative z-index-1 fix">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="eg-login__wrapper">
                     {style ? (
                        <div className="eg-login__top text-center mb-30">
                           <h3 className="eg-login__title">Sign Up on EveryDay NFT.</h3>
                           <p>Already have an account? <span><Link to="/login">Sign In</Link></span></p>
                        </div>) : (
                        <div className="eg-login__top text-center mb-30">
                           <h3 className="eg-login__title">Login to EveryDay NFT.</h3>
                           <p>Don’t have an account? <span><Link to="/register">Create a free account</Link></span></p>
                        </div>)}
                     <div className="eg-login__option">
                        {style ? <RegisterForm /> : <LoginForm />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default LogingArea;
